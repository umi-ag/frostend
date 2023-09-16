module frostend::vault {
    use std::ascii::String;
    use std::debug::print;
    use std::fixed_point32::{Self, FixedPoint32};
    use std::type_name;

    use sui::clock::{Self, Clock};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Supply, Balance};
    use sui::tx_context::{TxContext};

    use math::fixedU32;

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
        issued_at: u64,
        matures_at: u64,
    }

    fun init(ctx: &mut TxContext) {

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

    /// constrains 0 <= t <= 1
    public fun get_time_to_maturity<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint32 {
        let current_time = clock::timestamp_ms(clock);

        if (current_time < vault.issued_at) {
            fixedU32::from_u64(1)
        } else if (current_time > vault.matures_at) {
            fixedU32::from_u64(0)
        } else {
            fixedU32::div(
                fixedU32::from_u64(current_time - vault.issued_at),
                fixedU32::from_u64(vault.matures_at - vault.issued_at)
            )
        }
    }

    /// (Y/X)^t
    public fun get_price_pt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint32 {
        let x = fixedU32::from_u64(balance::value(&vault.coin_sy_reserve));
        let y = fixedU32::from_u64(balance::value(&vault.coin_pt_reserve));
        let t = get_time_to_maturity(vault, clock);

        fixedU32::powf(fixedU32::div(y, x), t)
    }

    /// 1 - (Y/X)^t
    public fun get_price_yt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint32 {
        fixedU32::sub(fixedU32::from_u64(1), get_price_pt_to_sy(vault, clock))
    }

    /// x_0^(1-t) + y_0^(1-t) = (x_0+dx)^(1-t) + (y_0+dy)^(1-t)
    /// args:
    ///     x_0 > 0
    ///     y_0 > 0
    ///     dx > 0
    /// returns:
    ///     (-dy) >0
    public fun compute_delta_y(
        x_0: FixedPoint32,
        y_0: FixedPoint32,
        delta_x: FixedPoint32,
        t: FixedPoint32,
    ): FixedPoint32 {
        // 1 - t
        let tt = fixedU32::sub(fixedU32::from_u64(1), t);

        // x^(1-t) + y^(1-t) = k
        let k = fixedU32::powf(x_0, tt);

        let x_1 = fixedU32::add(x_0, delta_x);

        // x_1^(1-t) + y_1^(1-t) = k
        // y_1 = [ k - x_1^(1-t) ]^(1/(1-t))
        let y_1 = fixedU32::powf(
            fixedU32::sub(k, fixedU32::powf(x_1, tt)),
            fixedU32::div(fixedU32::from_u64(1), tt)
        );

        let delta_y = fixedU32::sub(y_1, y_0);
        delta_y
    }

    public(friend) fun swap_sy_to_pt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        let reserve_s = fixedU32::from_u64(balance::value(&vault.coin_sy_reserve));
        let reserve_t = fixedU32::from_u64(balance::value(&vault.coin_pt_reserve));
        let delta_s = fixedU32::from_u64(balance::value(&balance_sy));
        let t = get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU32::floor(delta_t);
        deposit_sy(balance_sy, vault);
        withdraw_pt(amount_target, vault)
    }

    public(friend) fun swap_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<X> {
        let reserve_s = fixedU32::from_u64(balance::value(&vault.coin_pt_reserve));
        let reserve_t = fixedU32::from_u64(balance::value(&vault.coin_sy_reserve));
        let delta_s = fixedU32::from_u64(balance::value(&balance_pt));
        let t = get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU32::floor(delta_t);
        deposit_pt(balance_pt, vault);
        withdraw_sy(amount_target, vault)
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
