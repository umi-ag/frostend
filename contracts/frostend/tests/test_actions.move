#[allow(unused_use)]
#[test_only]
module frostend::test_actions {
    use std::debug::print;

    use sui::sui::{SUI};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::transfer;
    use sui::test_scenario::{Self as test, ctx};

    use frostend::test_utils::{mint};

    use coinhouse::sol::{Self, SOL};


    const ALICE: address = @0xA11CE;


    #[test]
    fun test_A2(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        {
            {
                let ctx = test::ctx(test);
                sol::init_for_testing(ctx);
            };
            test::next_tx(test, ALICE);
            {
                {
                    let ctx = test::ctx(test);
                    let coin = mint<SOL>(100, 9, ctx);
                    transfer::public_transfer(coin, ALICE);
                };
            };
        };
        test::end(scenario);
    }

    #[test]
    fun test_A3(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        {
            {
                let ctx = test::ctx(test);
                sol::init_for_testing(ctx);
            };
            test::next_tx(test, ALICE);
            {
                {
                    let ctx = test::ctx(test);
                    let coin = mint<SOL>(100, 9, ctx);
                    transfer::public_transfer(coin, ALICE);
                };
            };
        };
        test::end(scenario);
    }
}
