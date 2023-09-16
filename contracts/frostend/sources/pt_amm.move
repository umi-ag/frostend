module frostend::pt_amm {
    use std::debug::print;
    use std::fixed_point32::{Self, FixedPoint32};

    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::tx_context::{TxContext};

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};

    use math::fixedU32;

    friend frostend::actions;

    fun init(_ctx: &TxContext) { }

    /// (Y/X)^t
    public fun get_price_pt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint32 {
        let x = fixedU32::from_u64(vault::coin_pt_reserve(vault));
        let y = fixedU32::from_u64(vault::coin_sy_reserve(vault));
        let t = vault::get_time_to_maturity(vault, clock);

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
        let reserve_s = fixedU32::from_u64(vault::coin_sy_reserve(vault));
        let reserve_t = fixedU32::from_u64(vault::coin_pt_reserve(vault));
        let delta_s = fixedU32::from_u64(balance::value(&balance_sy));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU32::floor(delta_t);
        vault::deposit_sy(balance_sy, vault);
        vault::withdraw_pt(amount_target, vault)
    }

    public(friend) fun swap_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<X> {

        let reserve_s = fixedU32::from_u64(vault::coin_pt_reserve(vault));
        let reserve_t = fixedU32::from_u64(vault::coin_sy_reserve(vault));
        let delta_s = fixedU32::from_u64(balance::value(&balance_pt));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU32::floor(delta_t);
        vault::deposit_pt(balance_pt, vault);
        vault::withdraw_sy(amount_target, vault)
    }
}
