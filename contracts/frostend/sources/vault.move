module frostend::vault {
    use std::ascii::String;
    use std::type_name;

    use sui::clock::{Self, Clock};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Supply, Balance};
    use sui::tx_context::{TxContext};

    use math::fixed_point64::{FixedPoint64};
    use math::fixedU64;

    friend frostend::pt_amm;
    friend frostend::sys_manager;

    struct PTCoin<phantom X> has drop {}

    struct YTCoin<phantom X> has drop {}

    struct Vault<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
        coin_pt_reserve: Balance<PTCoin<X>>,
        coin_yt_reserve: Balance<YTCoin<X>>,
        coin_pt_supply: Supply<PTCoin<X>>,
        coin_yt_supply: Supply<YTCoin<X>>,
        issued_at: u64,
        matures_at: u64,
    }

    public fun new<X>(
        issued_at: u64,
        matures_at: u64,
        ctx: &mut TxContext,
    ): Vault<X> {
        Vault {
            id: object::new(ctx),
            coin_sy_reserve: balance::zero(),
            coin_pt_reserve: balance::zero(),
            coin_yt_reserve: balance::zero(),
            coin_pt_supply: balance::create_supply( PTCoin {} ),
            coin_yt_supply: balance::create_supply(YTCoin {}),
            issued_at,
            matures_at,
        }
    }

    public fun get_type_name<X>(
    ): String {
        type_name::into_string(type_name::get<Vault<X>>())
    }

    public fun coin_sy_reserve<X>(
        vault: &Vault<X>,
    ): u64 {
        balance::value(&vault.coin_sy_reserve)
    }

    public fun coin_pt_reserve<X>(
        vault: &Vault<X>,
    ): u64 {
        balance::value(&vault.coin_pt_reserve)
    }

    /// constrains 0 <= t <= 1
    public fun get_time_to_maturity<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let current_time = clock::timestamp_ms(clock);

        if (current_time < vault.issued_at) {
            fixedU64::from_u64(1)
        } else if (current_time > vault.matures_at) {
            fixedU64::from_u64(0)
        } else {
            fixedU64::div(
                fixedU64::from_u64(current_time - vault.issued_at),
                fixedU64::from_u64(vault.matures_at - vault.issued_at)
            )
        }
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

    fun mint_pt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ): Balance<PTCoin<X>> {
        balance::increase_supply(&mut vault.coin_pt_supply, amount)
    }

    fun burn_pt<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
    ) {
        balance::decrease_supply(&mut vault.coin_pt_supply, balance_pt);
    }

    fun mint_yt<X>(
        amount: u64,
        vault: &mut Vault<X>,
    ): Balance<YTCoin<X>> {
        balance::increase_supply(&mut vault.coin_yt_supply, amount)
    }

    fun burn_yt<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
    ) {
        balance::decrease_supply(&mut vault.coin_yt_supply, balance_yt);
    }

    public(friend) fun mint_pt_and_yt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
    ): (Balance<PTCoin<X>>, Balance<YTCoin<X>>) {
        let amount = balance::value(&balance_sy);
        deposit_sy(balance_sy, vault);
        let balance_pt = mint_pt(amount, vault);
        let balance_yt = mint_yt(amount, vault);

        (balance_pt, balance_yt)
    }

    public(friend) fun burn_pt_and_yt<X>(
        balance_pt: Balance<PTCoin<X>>,
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_pt);

        // TODO: Uncomment this
        // assert(balance::value(&balance_yt) == amount);

        burn_pt(balance_pt, vault);
        burn_yt(balance_yt, vault);
        withdraw_sy(amount, vault)
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
