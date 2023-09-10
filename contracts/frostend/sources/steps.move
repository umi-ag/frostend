module frostend::steps {
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

    struct Pool<phantom X, phantom Y> has key, store {
        id: UID,
        coin_x: Balance<X>,
        coin_y: Balance<Y>,
    }

    struct PTCoin<phantom X> has drop {}

    struct YTCoin<phantom X> has drop {}

    struct Vault<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
        coin_pt_reserve: Balance<PTCoin<X>>,
        coin_yt_reserve: Balance<YTCoin<X>>,
        coin_pt_supply: Supply<PTCoin<X>>,
        coin_yt_supply: Supply<YTCoin<X>>,
    }

    struct Bank<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
    }

    fun init(ctx: &mut TxContext) {

    }

    public(friend) fun deposit_sy<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
    ) {
        balance::join(&mut vault.coin_sy_reserve, balance_sy);
    }

    public(friend) fun deposit_pt<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
    ) {
        balance::join(&mut vault.coin_pt_reserve, balance_pt);
    }

    public(friend) fun deposit_yt<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
    ) {
        balance::join(&mut vault.coin_yt_reserve, balance_yt);
    }

    public(friend) fun withdraw_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ): Balance<X> {
        balance::split(&mut vault.coin_sy_reserve, amount)
    }

    public(friend) fun withdraw_pt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ): Balance<PTCoin<X>> {

        balance::split(&mut vault.coin_pt_reserve, amount)
    }

    public(friend) fun withdraw_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ): Balance<YTCoin<X>> {
        balance::split(&mut vault.coin_yt_reserve, amount)
    }

    public(friend) fun mint_pt_and_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        let balance_pt = balance::increase_supply(&mut vault.coin_pt_supply, amount);
        let balance_yt = balance::increase_supply(&mut vault.coin_yt_supply, amount);
        deposit_pt(balance_pt, vault);
        deposit_yt(balance_yt, vault);
    }

    public(friend) fun burn_pt_and_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        let balance_pt = withdraw_pt(amount, vault);
        let balance_yt = withdraw_yt(amount, vault);
        balance::decrease_supply(&mut vault.coin_pt_supply, balance_pt);
        balance::decrease_supply(&mut vault.coin_yt_supply, balance_yt);
    }

    public(friend) fun borrow_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = balance::split(&mut bank.coin_sy_reserve, amount);
        deposit_sy(balance_sy, vault);
    }

    public(friend) fun payback_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = withdraw_sy(amount, vault);
        balance::join(&mut bank.coin_sy_reserve, balance_sy);
    }

    /// ----------------------------------------

    public fun swap_sy_to_pt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<PTCoin<X>> {
        let amount = balance::value(&balance_sy);
        deposit_sy(balance_sy, vault);
        payback_sy(amount, vault, bank);
        withdraw_pt(amount, vault)
    }

    public fun swap_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_pt);
        deposit_pt(balance_pt, vault);
        borrow_sy(amount, vault, bank);
        withdraw_sy(amount, vault)
    }

    public fun swap_sy_to_yt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<YTCoin<X>> {
        let amount = balance::value(&balance_sy);
        deposit_sy(balance_sy, vault);
        borrow_sy(amount, vault, bank);
        mint_pt_and_yt(amount, vault);
        withdraw_yt(amount, vault)
    }

    public fun swap_yt_to_sy<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_yt);
        deposit_yt(balance_yt, vault);
        burn_pt_and_yt(amount, vault);
        payback_sy(amount, vault, bank);
        withdraw_sy(amount, vault)
    }

    public fun swap_pt_to_yt<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<YTCoin<X>> {
        let amount = balance::value(&balance_pt);
        deposit_pt(balance_pt, vault);
        borrow_sy(amount, vault, bank);
        mint_pt_and_yt(amount, vault);
        withdraw_yt(amount, vault)
    }

    public fun swap_yt_to_pt<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<PTCoin<X>> {
        let amount = balance::value(&balance_yt);
        deposit_yt(balance_yt, vault);
        burn_pt_and_yt(amount, vault);
        payback_sy(amount, vault, bank);
        withdraw_pt(amount, vault)
    }
}
