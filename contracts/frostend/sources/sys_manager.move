module frostend::sys_manager {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::clock::{Clock};
    use sui::tx_context::{TxContext};
    use sui::transfer;

    use math::fixedU64;
    use math::u128;

    use frostend::bank::{Self, Bank};
    use frostend::token::{PTCoin, SYCoin, YTCoin};
    use frostend::vault::{Self, Vault};
    use frostend::pt_amm;

    use std::debug::print;

    friend frostend::actions;

    const E_issued_at_must_be_less_than_matures_at: u64 = 102;
    const E_amount_supply_must_be_greater_than_balance_sy: u64 = 103;

    public(friend) fun init_vault<X>(
        issued_at: u64,
        matures_at: u64,
        coin_tag: Coin<X>,
        amount_pt_to_provide: u64,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): (Coin<PTCoin<X>>, Coin<YTCoin<X>>) {
        assert!(issued_at < matures_at, E_issued_at_must_be_less_than_matures_at);

        let vault = vault::new<X>(issued_at, matures_at, ctx);
        let (coin_pt, coin_yt) =  pt_amm::add_liquidity_from_tag(
            bank,
            &mut vault,
            coin_tag,
            amount_pt_to_provide,
            ctx,
        );
        transfer::public_share_object(vault);
        (coin_pt, coin_yt)
    }

    /// yan.#SY += -4
    /// yan.#YT += 100
    /// bank.#SY += -96
    /// vault.#SY += 100
    /// vault.#PT += 100
    public(friend) fun swap_sy_to_yt<X>(
        balance_sy: Balance<SYCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<YTCoin<X>> {
        let price_yt = pt_amm::get_price_yt_to_sy(vault, clock); // 4
        let delta_supply = u128::try_into_u64(
            fixedU64::floor(
                fixedU64::div(
                    fixedU64::from_u64(balance::value(&balance_sy)), // 4
                    price_yt, // 0.04
                )
            )
        ); // 100

        let amount_sy_to_borrow_from_bank = delta_supply - balance::value(&balance_sy); // 96
        let balance_sy_bank = bank::withdraw_sy(bank, amount_sy_to_borrow_from_bank);
        balance::join(&mut balance_sy, balance_sy_bank); // 100
        let (balance_pt, balance_yt) = vault::mint_pt_and_yt(vault, balance_sy);
        vault::deposit_pt(vault, balance_pt);

        balance_yt
    }

    /// yan.#SY += 4
    /// yan.#YT += -100
    /// bank.#SY += 96
    /// vault.#SY += -100
    /// vault.#PT += -100
    public(friend) fun swap_yt_to_sy<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<SYCoin<X>> {
        let delta_supply = balance::value(&balance_yt); // 100
        let balance_pt = vault::withdraw_pt(vault, delta_supply);
        let balance_sy = vault::burn_pt_and_yt(vault, balance_pt, balance_yt);

        let price_pt = pt_amm::get_price_pt_to_sy(vault, clock);

        let amount_to_yan = u128::try_into_u64(
            fixedU64::floor(
                fixedU64::mul(
                    fixedU64::from_u64(delta_supply),
                    price_pt,
                )
            )
        );
        let balance_sy_to_repay_for_bank = balance::split(&mut balance_sy, amount_to_yan);
        bank::deposit_sy(bank, balance_sy_to_repay_for_bank);

        balance_sy
    }

    #[test_only] use sui::sui::SUI;
    #[test_only] use sui::tx_context;
    #[test_only] use sui::test_utils::{assert_eq, destroy};
    #[test_only] use toolkit::test_utils::{decimals, mint};
    #[test_only] use sui::test_scenario::{Self as test, ctx};

    #[test_only] const ALICE: address = @0xA11CE;

    #[test, expected_failure(abort_code = frostend::sys_manager::E_issued_at_must_be_less_than_matures_at)]
    fun test_should_fail_matures_at() {
        let scenario = test::begin(@0x0);
        let test = &mut scenario;

        bank::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        bank::deposit( mint<SUI>(1234, 9, ctx(test)), test);
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let (coin_pt, coin_yt) = init_vault<SUI>(
                112345,
                102345,
                mint<SUI>(100, 9, ctx(test)),
                decimals(96, 9),
                &mut bank,
                ctx(test),
            );
            transfer::public_transfer(coin_pt, ALICE);
            transfer::public_transfer(coin_yt, ALICE);
            transfer::public_share_object(bank);
        };
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);

            vault::assert_eq_reserve_sy(&vault, decimals(100, 9));
            vault::assert_eq_reserve_pt(&vault, decimals(96, 9));
            vault::assert_eq_reserve_yt(&vault, decimals(0, 9));
            vault::assert_eq_supply_pt(&vault, decimals(100, 9));
            vault::assert_eq_supply_yt(&vault, decimals(100, 9));

            test::return_shared(bank);
            test::return_shared(vault);
        };

        test::end(scenario);
    }

    #[test]
    fun test_init_vault() {
        let scenario = test::begin(@0x0);
        let test = &mut scenario;

        bank::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        bank::deposit( mint<SUI>(1234, 9, ctx(test)), test);
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let (coin_pt, coin_yt) = init_vault<SUI>(
                102345,
                112345,
                mint<SUI>(100, 9, ctx(test)),
                decimals(96, 9),
                &mut bank,
                ctx(test),
            );
            transfer::public_transfer(coin_pt, ALICE);
            transfer::public_transfer(coin_yt, ALICE);
            transfer::public_share_object(bank);
        };
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);

            vault::assert_eq_reserve_sy(&vault, decimals(100, 9));
            vault::assert_eq_reserve_pt(&vault, decimals(96, 9));
            vault::assert_eq_reserve_yt(&vault, decimals(0, 9));
            vault::assert_eq_supply_pt(&vault, decimals(100, 9));
            vault::assert_eq_supply_yt(&vault, decimals(100, 9));

            test::return_shared(bank);
            test::return_shared(vault);
        };

        test::end(scenario);
    }
}
