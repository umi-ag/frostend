#[allow(unused_use)]
#[test_only]
module frostend::swap {
    use std::debug::print;

    use sui::sui::{Self, SUI};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::transfer;
    use sui::test_scenario::{Self as test, ctx};

    use toolkit::test_utils::{decimals, mint};

    use frostend::bank::{Self, Bank};
    use frostend::root::{Self, Root};
    use frostend::actions;

    use coinhouse::sol::{Self, SOL};


    const ALICE: address = @0xA11CE;

}
