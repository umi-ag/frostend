#[allow(unused_use)]
#[test_only]
module frostend::for_testing {
    use std::debug::print;

    use sui::clock::{Self, Clock};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::sui::{Self, SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::test_scenario::{Self as test, Scenario, ctx};

    // use toolkit::test_utils::{decimals, mint};

    use frostend::bank::{Self, Bank};
    use frostend::root::{Self, Root};
    use frostend::actions;

    use coinhouse::sol::{Self, SOL};

    const ALICE: address = @0xA11CE;


    public fun init_package(test: &mut Scenario) {
        root::init_for_testing(ctx(test));
    }

    public fun create_bank<X>(test: &mut Scenario) {
        let root = test::take_shared<Root>(test);
        {
            actions::create_bank<X>(&mut root, ctx(test));
        };
        test::return_shared(root);
    }
}
