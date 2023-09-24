module frostend::pt_amm {
    use sui::balance::{Self, Balance};
    use sui::clock::{Clock};

    use math::fixed_point64::{FixedPoint64};
    use math::fixedU64;
    use frostend::token::{PTCoin};
    use frostend::vault::{Self, Vault};

    friend frostend::actions;


    /// (Y/X)^t
    public fun get_price_pt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let x = fixedU64::from_u64(vault::coin_pt_reserve(vault));
        let y = fixedU64::from_u64(vault::coin_sy_reserve(vault));
        let t = vault::get_time_to_maturity(vault, clock);

        fixedU64::powf(fixedU64::div(y, x), t)
    }

    /// 1 - (Y/X)^t
    public fun get_price_yt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        fixedU64::sub(fixedU64::from_u64(1), get_price_pt_to_sy(vault, clock))
    }

    /// x_0^(1-t) + y_0^(1-t) = (x_0+dx)^(1-t) + (y_0+dy)^(1-t)
    /// args:
    ///     x_0 > 0
    ///     y_0 > 0
    ///     dx > 0
    /// returns:
    ///     (-dy) >0
    public fun compute_delta_y(
        x_0: FixedPoint64,
        y_0: FixedPoint64,
        delta_x: FixedPoint64,
        t: FixedPoint64,
    ): FixedPoint64 {
        // 1 - t
        let tt = fixedU64::sub(fixedU64::from_u64(1), t);

        // x^(1-t) + y^(1-t) = k
        let k = fixedU64::powf(x_0, tt);

        let x_1 = fixedU64::add(x_0, delta_x);

        // x_1^(1-t) + y_1^(1-t) = k
        // y_1 = [ k - x_1^(1-t) ]^(1/(1-t))
        let y_1 = fixedU64::powf(
            fixedU64::sub(k, fixedU64::powf(x_1, tt)),
            fixedU64::div(fixedU64::from_u64(1), tt)
        );

        let delta_y = fixedU64::sub(y_1, y_0);
        delta_y
    }

    public(friend) fun swap_sy_to_pt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        let reserve_s = fixedU64::from_u64(vault::coin_sy_reserve(vault));
        let reserve_t = fixedU64::from_u64(vault::coin_pt_reserve(vault));
        let delta_s = fixedU64::from_u64(balance::value(&balance_sy));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU64::floor(delta_t);
        vault::deposit_sy(balance_sy, vault);
        vault::withdraw_pt((amount_target as u64), vault)
    }

    public(friend) fun swap_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<X> {

        let reserve_s = fixedU64::from_u64(vault::coin_pt_reserve(vault));
        let reserve_t = fixedU64::from_u64(vault::coin_sy_reserve(vault));
        let delta_s = fixedU64::from_u64(balance::value(&balance_pt));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU64::floor(delta_t);
        vault::deposit_pt(balance_pt, vault);
        vault::withdraw_sy((amount_target as u64), vault)
    }
}
