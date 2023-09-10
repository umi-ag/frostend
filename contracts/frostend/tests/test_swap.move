
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
    use frostend::vault::{Self, Vault};
    use frostend::stsui_coin::{Self, STSUI_COIN};


    const TEST_ADDR: address = @0xA11CE;

    struct COIN_TESTS has drop {}

    #[test]
    fun test_hello() {
        assert_eq(true, true);
    }

    #[test]
    fun test_swap_sy_to_pt() {
        let bank_id;
        let vault_id;
        let scenario = test_scenario::begin(TEST_ADDR);
        let test = &mut scenario;
        {
            let ctx = test_scenario::ctx(test);

            let bank = bank::new<STSUI_COIN>( ctx);
            let vault = vault::new<STSUI_COIN>(ctx);
            bank_id = object::id(&bank);
            vault_id = object::id(&vault);
            transfer::public_transfer(bank, tx_context::sender(ctx));
            transfer::public_transfer(vault, tx_context::sender(ctx));
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let ctx = test_scenario::ctx(test);
            stsui_coin::test_init(ctx);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        print(&114514);
        {
            let treasury_cap = test_scenario::take_from_sender<TreasuryCap<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);
            stsui_coin::mint_to(&mut treasury_cap, 100 * 100_000_000, ctx);
            test_scenario::return_to_sender(test, treasury_cap);
        };
        test_scenario::next_tx(test, TEST_ADDR);
        {
            let stsui_coin = test_scenario::take_from_sender<Coin<STSUI_COIN>>(test);
            let bank = test_scenario::take_from_sender<Bank<STSUI_COIN>>(test);
            let vault = test_scenario::take_from_sender<Vault<STSUI_COIN>>(test);
            let ctx = test_scenario::ctx(test);


            let pt_coin = frostend::swap::swap_sy_to_pt(
                vector[stsui_coin],
                &mut vault,
                &mut bank,
                ctx,
            );
            transfer::public_transfer(pt_coin, tx_context::sender(ctx));

            test_scenario::return_to_sender(test, bank);
            test_scenario::return_to_sender(test, vault);
        };


        test_scenario::end(scenario);



        assert_eq(true, true);

    }
}
