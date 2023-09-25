#[allow(unused_use)]
#[test_only]
module frostend::swap {
    use std::debug::print;

    use sui::clock::{Self, Clock};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::sui::{Self, SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::test_scenario::{Self as test, ctx};

    use toolkit::test_utils::{decimals, mint};

    use frostend::bank::{Self, Bank};
    use frostend::vault::{Self, Vault};
    use frostend::root::{Self, Root};
    use frostend::actions;
    use frostend::for_testing;
    use frostend::sys_manager;

    const ALICE: address = @0xA11CE;


    #[test]
    fun test_swap_tag_to_yt() {
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        let clock = clock::create_for_testing(ctx(test));

        for_testing::init_package(test);
        test::next_tx(test, ALICE);
        for_testing::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        bank::deposit(mint<SUI>(1234, 9, ctx(test)), test);
        test::next_tx(test, ALICE);
        sys_manager::create_vault(
            mint<SUI>(1234, 9, ctx(test)),
            decimals(999, 9),
            test,
        );
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);
            {
                let coin_yt = actions::swap_tag_to_yt(
                    &mut bank,
                    &mut vault,
                    mint<SUI>(10, 9, ctx(test)),
                    &clock,
                    ctx(test),
                );
                transfer::public_transfer(coin_yt, ALICE);
            };
            test::return_shared(bank);
            test::return_shared(vault);
        };

        clock::destroy_for_testing(clock);
        test::end(scenario);
    }

    #[test]
    fun test_swap_tag_to_yt_to_tag() {
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        let clock = clock::create_for_testing(ctx(test));

        for_testing::init_package(test);
        test::next_tx(test, ALICE);
        for_testing::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        bank::deposit(mint<SUI>(1234, 9, ctx(test)), test);
        test::next_tx(test, ALICE);
        sys_manager::create_vault(
            mint<SUI>(1234, 9, ctx(test)),
            decimals(999, 9),
            test,
        );
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);
            {
                let coin_yt = actions::swap_tag_to_yt(
                    &mut bank,
                    &mut vault,
                    mint<SUI>(10, 9, ctx(test)),
                    &clock,
                    ctx(test),
                );
                print(&math::display::from_u64(&coin::value(&coin_yt)));

                let coin_tag = actions::swap_yt_to_tag(
                    &mut bank,
                    &mut vault,
                    coin_yt,
                    &clock,
                    ctx(test),
                );
                print(&math::display::from_u64(&coin::value(&coin_tag)));

                transfer::public_transfer(coin_tag, ALICE);
            };
            test::return_shared(bank);
            test::return_shared(vault);
        };

        clock::destroy_for_testing(clock);
        test::end(scenario);
    }

    #[test]
    fun test_swap_tag_to_pt() {
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        let clock = clock::create_for_testing(ctx(test));
        clock::set_for_testing(&mut clock, 1_620_000_000_000);
        print(&clock);

        for_testing::init_package(test);
        test::next_tx(test, ALICE);
        for_testing::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        bank::deposit(mint<SUI>(1234, 9, ctx(test)), test);
        test::next_tx(test, ALICE);
        sys_manager::create_vault(
            mint<SUI>(1234, 9, ctx(test)),
            decimals(999, 9),
            test,
        );
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);
            {
                let coin_pt = actions::swap_tag_to_pt(
                    &mut bank,
                    &mut vault,
                    mint<SUI>(56, 9, ctx(test)),
                    &clock,
                    ctx(test),
                );
                transfer::public_transfer(coin_pt, ALICE);
            };
            test::return_shared(bank);
            test::return_shared(vault);
        };

        clock::destroy_for_testing(clock);
        test::end(scenario);
    }

}
