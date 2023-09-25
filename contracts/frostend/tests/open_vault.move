#[allow(unused_use)]
#[test_only]
module frostend::open_vault {
    use std::debug::print;

    use sui::sui::{Self, SUI};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::transfer;
    use sui::test_scenario::{Self as test, ctx};

    use toolkit::test_utils::{decimals, mint};

    use frostend::bank::{Self, Bank};
    use frostend::root::{Self, Root};
    use frostend::actions;
    use frostend::for_testing;

    use coinhouse::sol::{Self, SOL};


    const ALICE: address = @0xA11CE;

    #[test, expected_failure(abort_code = frostend::sys_manager::E_issued_at_must_be_less_than_matures_at)]
    fun test_E102(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;

        for_testing::init_package(test);
        test::next_tx(test, ALICE);
        for_testing::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            {
                let issued_at = 1234567890123;
                let matures_at = 123;
                let coin = mint<SUI>(100, 9, ctx(test));
                let amount_supply = decimals(1, 9);
                let (coin_pt, coin_yt) = actions::init_vault(
                    issued_at,
                    matures_at,
                    coin,
                    amount_supply,
                    &mut bank,
                    ctx(test),
                );
                transfer::public_transfer(coin_pt, ALICE);
                transfer::public_transfer(coin_yt, ALICE);
            };
            test::return_shared(bank);
        };

        test::end(scenario);
    }


    #[test, expected_failure(abort_code = frostend::pt_amm::E_amount_pt_to_provider_must_be_greater_than_amount_sy)]
    fun test_E104(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;

        for_testing::init_package(test);
        test::next_tx(test, ALICE);
        for_testing::create_bank<SUI>(test);
        test::next_tx(test, ALICE);
        {
            let bank = test::take_shared<Bank<SUI>>(test);
            {
                let issued_at = 1234567890123;
                let matures_at = 1239567890123;
                let coin = mint<SUI>(100, 9, ctx(test));
                let amount_supply = decimals(1_000, 9);
                let (coin_pt, coin_yt) = actions::init_vault(
                    issued_at,
                    matures_at,
                    coin,
                    amount_supply,
                    &mut bank,
                    ctx(test),
                );
                transfer::public_transfer(coin_pt, ALICE);
                transfer::public_transfer(coin_yt, ALICE);
            };
            test::return_shared(bank);
        };

        test::end(scenario);
    }

    #[test]
    fun test_A105_deposit(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        {
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
        };
        test::end(scenario);
    }

    #[test]
    fun test_A105(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;

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
                let issued_at = 1234567890123;
                let matures_at = 1239567890123;
                let coin = mint<SUI>(1234, 9, ctx(test));
                let amount_supply = decimals(999, 9);
                let (coin_pt, coin_yt) = actions::init_vault(
                    issued_at,
                    matures_at,
                    coin,
                    amount_supply,
                    &mut bank,
                    ctx(test),
                );
                transfer::public_transfer(coin_pt, ALICE);
                transfer::public_transfer(coin_yt, ALICE);
            };
            test::return_shared(bank);
        };

        test::end(scenario);
    }
}
