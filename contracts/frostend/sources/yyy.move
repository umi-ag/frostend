module frostend::amm {
    use std::ascii::String;
    use std::type_name;
    use std::vector;

    use sui::object::{Self, UID, ID};
    use sui::balance::{Self, Supply, Balance};
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;
    use sui::event;
    use sui::math;
    use sui::transfer;
    use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
    use sui::tx_context::{Self, TxContext};

    use frostend::utils;

    struct Vault<phantom X> has key, store {
        id: UID,
        coin_x: Balance<X>,
    }

    struct Pool<phantom X, phantom Y> has key, store {
        id: UID,
        coin_x: Balance<X>,
        coin_y: Balance<Y>,
    }

    struct PTCoin<phantom X> has drop {}

    struct YTCoin<phantom X> has drop {}

    struct SYCoinVault<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
        pt_supply: Supply<PTCoin<X>>,
        yt_supply: Supply<YTCoin<X>>,
    }

    struct Bank<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
        coin_pt_reserve: Balance<PTCoin<X>>,
    }

    fun init(ctx: &mut TxContext) {

    }

    // /// SY->PT+YT
    // public fun deposit_sy_mint_pt_and_yt<X>(
    //     balance_sy: Balance<X>,
    //     sy_vault: &mut SYCoinVault<X>,
    // ): (Balance<PTCoin<X>>, Balance<YTCoin<X>>) {
    //     let amount = balance::value(&balance_sy);
    //     let balance_pt = balance::increase_supply(&mut sy_vault.pt_supply, amount);
    //     let balance_yt = balance::increase_supply(&mut sy_vault.yt_supply, amount);

    //     balance::join(&mut sy_vault.coin_sy_reserve, balance_sy);

    //     (balance_pt, balance_yt)
    // }

    // /// PT+YT->SY
    // public fun withdraw_sy_to_burn_pt_and_yt<X>(
    //     balance_pt: Balance<PTCoin<X>>,
    //     balance_yt: Balance<YTCoin<X>>,
    //     sy_vault: &mut SYCoinVault<X>,
    // ): Balance<X> {
    //     let amount = balance::value(&balance_pt);
    //     balance::decrease_supply(&mut sy_vault.pt_supply, balance_pt);
    //     balance::decrease_supply(&mut sy_vault.yt_supply, balance_yt);

    //     let balance_sy = balance::split(&mut sy_vault.coin_sy_reserve, amount);
    //     balance_sy
    // }

    // /// SY->YT
    // public fun deposit_sy_to_mint_yt<X>(
    //     balance_sy: Balance<X>,
    //     sy_vault: &mut SYCoinVault<X>,
    //     bank: &mut Bank<X>,
    // ): Balance<YTCoin<X>> {
    //     let (balance_pt, balance_yt) = deposit_sy_mint_pt_and_yt(balance_sy, sy_vault);
    //     let balance_sy = bank_swap_pt_to_sy(balance_pt, bank);
    //     balance_yt
    // }

    // /// YT->SY
    // public fun withdraw_sy_to_burn_yt<X>(
    //     balance_yt: Balance<YTCoin<X>>,
    //     sy_vault: &mut SYCoinVault<X>,
    //     bank: &mut Bank<X>,
    // ): Balance<X> {
    //     let amount_pt = balance::value(&balance_yt) / 4 * 96;
    //     // let balance_pt = bank_swap_sy_to_pt(, bank);
    //     let balance_sy = withdraw_sy_to_burn_pt_and_yt(balance_pt, balance_yt, sy_vault);
    //     balance_sy
    // }

    // // public fun borrow_pt_from_bank<X>(
    // public fun bank_swap_sy_to_pt<X>(
    //     balance_sy: Balance<X>,
    //     bank: &mut Bank<X>,
    // ): Balance<PTCoin<X>> {
    //     let amount = balance::value(&balance_sy);
    //     let balance_pt = balance::split(&mut bank.coin_pt_reserve, amount);
    //     balance::join(&mut bank.coin_sy_reserve, balance_sy);
    //     balance_pt
    // }

    // // repay_pt_toward_bank(balance_pt, bank);
    // public fun bank_swap_pt_to_sy<X>(
    //     balance_pt: Balance<PTCoin<X>>,
    //     bank: &mut Bank<X>,
    // ): Balance<X> {
    //     let balance_sy = balance::split(&mut bank.coin_sy_reserve, balance::value(&balance_pt));
    //     balance::join(&mut bank.coin_pt_reserve, balance_pt);
    //     balance_sy
    // }

    // /// SY->PT
    // public fun deposit_sy_mint_pt<X>(
    //     balance_sy: Balance<X>,
    //     sy_vault: &mut SYCoinVault<X>,
    //     bank: &mut Bank<X>,
    // ): Balance<PTCoin<X>> {
    //     let amount_pt = 0;
    //     let balance_pt = borrow_pt_from_bank(amount_pt, bank);
    //     balance::join(&mut bank.coin_pt_reserve, balance_pt);

    //     balance_pt
    // }







    // // SY->PT
    // public fun deposit_sy_to_mint_pt<X>(
    //     balance_sy: Balance<X>,
    //     sy_vault: &mut SYCoinVault<X>,
    //     pt_vault: &mut PTCoinVault<X>,
    // ): Balance<PTCoin<X>> {
    //     let amount = balance::value(balance_sy);

    //     // let balance_sy = balance::split(&mut pt_vault.coin_sy_reserve, amount);
    //     let balance_pt = balance::increase_supply(&mut vault.pt_supply, balance::value(balance_sy));
    //     balance::join(&mut pt_vault.coin_sy_reserve, balance_sy);
    //     balance_pt
    // }

    // // PT->SY
    // public fun withdraw_sy_and_burn_pt<X>(
    //     balance_pt: Balance<PTCoin<X>>,
    //     vault: &mut PTCoinVault<X>,
    // ): Balance<X> {
    //     let balance_sy = balance::split(&mut vault.coin_sy_reserve, balance::value(balance_pt));
    //     balance::decrease_supply(&mut pool.pt_supply, balance_pt);
    //     balance_sy
    // }


    // // SY->YT
    // public fun deposit_sy_and_mint_yt<X>(
    //     balance_sy: Balance<X>,
    //     pt_vault: &mut PTCoinVault<X>,
    //     yt_vault: &mut YTCoinVault<X>,
    // ): Balance<YTCoin<X>> {



    //     let balance_yt = balance::increase_supply(&mut vault.yt_supply, balance::value(balance_sy));
    //     balance::join(&mut vault.coin_sy_reserve, balance_sy);
    //     balance_yt
    // }


    // public fun mint_pt_and_yt<X>(
    //     &mut

    // ): (Balance<PTCoin<X>>, Balance<YTCoin<X>>) {
    //     let balance_lp = balance::increase_supply(&mut pool.lp_supply, liquidity);
    //         id: UID::new(),
    //         supply: Supply::new(),
    //         coin: Coin::new(),
    //     };
    //     let yt = Balance<YT> {
    //         id: UID::new(),
    //         supply: Supply::new(),
    //         coin: Coin::new(),
    //     };
    // }

    // public fun swap_sy_to_pt() {
    //     mint

    // }
}
