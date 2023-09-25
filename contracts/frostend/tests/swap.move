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

    use coinhouse::sol::{Self, SOL};

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
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            {
                let coin_csy = actions::deposit(
                    &mut bank,
                    mint<SUI>(1234, 9, ctx(test)),
                    ctx(test),
                );
                transfer::public_transfer(coin_csy, ALICE);
            };
            test::return_shared(bank);
        };
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            {
                let (coin_pt, coin_yt) = actions::init_vault(
                    1_600_333_444_000,
                    1_610_333_444_000,
                    mint<SUI>(1234, 9, ctx(test)),
                    decimals(999, 9),
                    &mut bank,
                    ctx(test),
                );

                transfer::public_transfer(coin_pt, ALICE);
                transfer::public_transfer(coin_yt, ALICE);
            };
            test::return_shared(bank);
        };
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            let vault = test::take_shared<Vault<SUI>>(test);
            {
                let ytCoin = actions::swap_tag_to_yt(
                    &mut bank,
                    &mut vault,
                    mint<SUI>(10, 9, ctx(test)),
                    &clock,
                    ctx(test),
                );
                transfer::public_transfer(ytCoin, ALICE);
            };
            test::return_shared(bank);
            test::return_shared(vault);
        };

        clock::destroy_for_testing(clock);
        test::end(scenario);
    }

}
