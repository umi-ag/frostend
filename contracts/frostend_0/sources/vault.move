module frostend::vault {
    use std::ascii::String;
    use std::debug::print;
    use std::type_name;

    use sui::object::{Self, UID};
    use sui::balance::{Self, Supply, Balance};
    use sui::tx_context::{TxContext};

    friend frostend::bank;
    friend frostend::actions;

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

    fun init(ctx: &mut TxContext) {

    }

    public fun new<X>(
        ctx: &mut TxContext,
    ): Vault<X> {
        Vault {
            id: object::new(ctx),
            coin_sy_reserve: balance::zero(),
            coin_pt_reserve: balance::zero(),
            coin_yt_reserve: balance::zero(),
            coin_pt_supply: balance::create_supply( PTCoin {} ),
            coin_yt_supply: balance::create_supply(YTCoin {}),
        }
    }

    public fun get_type_name<X>(
    ): String {
        type_name::into_string(type_name::get<Vault<X>>())
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
        let amount = balance::value(&balance_pt);
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

    public(friend) fun mint_pt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        let balance_pt = balance::increase_supply(&mut vault.coin_pt_supply, amount);
        deposit_pt(balance_pt, vault);
    }

    public(friend) fun burn_pt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        let balance_pt = withdraw_pt(amount, vault);
        balance::decrease_supply(&mut vault.coin_pt_supply, balance_pt);
    }

    public(friend) fun mint_pt_and_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        mint_pt(amount, vault);
        let balance_yt = balance::increase_supply(&mut vault.coin_yt_supply, amount);
        deposit_yt(balance_yt, vault);
    }

    public(friend) fun burn_pt_and_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ) {
        burn_pt(amount, vault);
        let balance_yt = withdraw_yt(amount, vault);
        balance::decrease_supply(&mut vault.coin_yt_supply, balance_yt);
    }

    public fun all_is_zero<X>(
        vault: &Vault<X>,
    ): bool {
        balance::value(&vault.coin_sy_reserve) == 0
        && balance::value(&vault.coin_pt_reserve) == 0
        && balance::value(&vault.coin_yt_reserve) == 0
        && balance::supply_value(&vault.coin_pt_supply) == 0
        && balance::supply_value(&vault.coin_yt_supply) == 0
    }
}
