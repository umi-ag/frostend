#[test_only]
module frostend::test_swap {
    use std::debug::print;

    use sui::balance;
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::object;
    use std::option;
    use sui::test_scenario;
    use sui::test_utils::assert_eq;
    use sui::transfer;
    use sui::tx_context;

    use frostend::bank::{Self, Bank};
    use frostend::root;
    use frostend::swap;
    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::stsui_coin::{Self, STSUI_COIN};


    const TEST_ADDR: address = @0xA11CE;

    struct COIN_TESTS has drop {}

    #[test]
    fun test_hello() {
        assert_eq(true, true);
    }

    #[test]
    fun test_swap_sy_to_pt_and_swap_pt_to_sy() {
        let scenario = test_scenario::begin(TEST_ADDR);
        let test = &mut scenario;
        {
            let ctx = test_scenario::ctx(test);

            let bank = bank::new<STSUI_COIN>(ctx);
            let vault = vault::new<STSUI_COIN>(ctx);
            transfer::public_transfer(bank, tx_context::sender(ctx));
            transfer::public_transfer(vault, tx_context::sender(ctx));
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let ctx = test_scenario::ctx(test);
            stsui_coin::test_init(ctx);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let treasury_cap = test_scenario::take_from_sender<TreasuryCap<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);
            stsui_coin::mint_to(&mut treasury_cap, 100 * 100_000_000, ctx);
            test_scenario::return_to_sender(test, treasury_cap);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let coin_sy = test_scenario::take_from_sender<Coin<STSUI_COIN>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let vault = test_scenario::take_from_sender<Vault<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);

            let coin_pt = frostend::swap::swap_sy_to_pt(
                vector[coin_sy],
                &mut vault,
                &mut bank,
                ctx,
            );
            transfer::public_transfer(coin_pt, tx_context::sender(ctx));

            print(&vector[2000, 1]);
            print(&vault);

            test_scenario::return_to_sender(test, bank);
            test_scenario::return_to_sender(test, vault);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let coin_pt = test_scenario::take_from_sender<Coin<PTCoin<STSUI_COIN>>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let vault = test_scenario::take_from_sender<Vault<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);

            let coin_sy = frostend::swap::swap_pt_to_sy(
                vector[coin_pt],
                &mut vault,
                &mut bank,
                ctx,
            );
            transfer::public_transfer(coin_sy, tx_context::sender(ctx));

            print(&vector[2000, 2]);
            print(&vault);

            assert_eq(vault::all_is_zero(&vault), true);

            test_scenario::return_to_sender(test, bank);
            test_scenario::return_to_sender(test, vault);
        };
        test_scenario::end(scenario);

        assert_eq(true, true);
    }


    #[test]
    fun test_swap_sy_to_yt_and_swap_yt_to_sy() {
        let scenario = test_scenario::begin(TEST_ADDR);
        let test = &mut scenario;
        {
            let ctx = test_scenario::ctx(test);

            let bank = bank::new<STSUI_COIN>( ctx);
            let vault = vault::new<STSUI_COIN>(ctx);
            transfer::public_transfer(bank, tx_context::sender(ctx));
            transfer::public_transfer(vault, tx_context::sender(ctx));
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let ctx = test_scenario::ctx(test);
            stsui_coin::test_init(ctx);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let treasury_cap = test_scenario::take_from_sender<TreasuryCap<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);
            stsui_coin::mint_to(&mut treasury_cap, 100 * 100_000_000, ctx);
            test_scenario::return_to_sender(test, treasury_cap);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let treasury_cap = test_scenario::take_from_sender<TreasuryCap<STSUI_COIN>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);

            let coin_sy = stsui_coin::mint(&mut treasury_cap, 10_000 * 100_000_000, ctx);
            bank::deposit(vector[coin_sy], &mut bank, ctx);

            test_scenario::return_to_sender(test, treasury_cap);
            test_scenario::return_to_sender(test, bank);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let coin_sy = test_scenario::take_from_sender<Coin<STSUI_COIN>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let vault = test_scenario::take_from_sender<Vault<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);

            let coin_yt = frostend::swap::swap_sy_to_yt(
                vector[coin_sy],
                &mut vault,
                &mut bank,
                ctx,
            );
            transfer::public_transfer(coin_yt, tx_context::sender(ctx));

            print(&vector[2001, 1]);
            print(&bank);
            print(&vault);

            test_scenario::return_to_sender(test, bank);
            test_scenario::return_to_sender(test, vault);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let coin_yt = test_scenario::take_from_sender<Coin<YTCoin<STSUI_COIN>>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let vault = test_scenario::take_from_sender<Vault<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);

            let coin_sy = frostend::swap::swap_yt_to_sy(
                vector[coin_yt],
                &mut vault,
                &mut bank,
                ctx,
            );
            transfer::public_transfer(coin_sy, tx_context::sender(ctx));

            print(&vector[2001, 2]);
            print(&bank);
            assert_eq(vault::all_is_zero(&vault), true);

            test_scenario::return_to_sender(test, bank);
            test_scenario::return_to_sender(test, vault);
        };
        test_scenario::end(scenario);

        assert_eq(true, true);

    }
}
