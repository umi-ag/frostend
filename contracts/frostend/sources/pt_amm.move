module frostend::pt_amm {
    use sui::balance::{Self, Balance};
    use sui::clock::{Clock};
    use sui::coin::{Self, Coin};
    use sui::tx_context::{Self, TxContext};

    use math::fixed_point64::{FixedPoint64};
    use math::fixedU64;
    use frostend::bank::{Self, Bank};
    use frostend::token::{PTCoin, SYCoin, YTCoin};
    use frostend::vault::{Self, Vault};


    friend frostend::actions;
    friend frostend::sys_manager;

    const E_amount_pt_to_provider_must_be_greater_than_amount_sy: u64 = 103;

    /// (Y/X)^t
    public fun get_price_pt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let x = fixedU64::from_u64(vault::reserve_sy(vault));
        let y = fixedU64::from_u64(vault::reserve_pt(vault));
        let t = vault::get_time_to_maturity(vault, clock);

        let r = fixedU64::powf(fixedU64::div(y, x), t);
        r
    }

    /// 1 - (Y/X)^t
    public fun get_price_yt_to_sy<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let r = fixedU64::sub(fixedU64::from_u64(1), get_price_pt_to_sy(vault, clock));
        r
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
        balance_sy: Balance<SYCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        let reserve_s = fixedU64::from_u64(vault::reserve_sy(vault));
        let reserve_t = fixedU64::from_u64(vault::reserve_pt(vault));
        let delta_s = fixedU64::from_u64(balance::value(&balance_sy));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU64::floor(delta_t);
        vault::deposit_sy(vault, balance_sy);
        vault::withdraw_pt(vault, (amount_target as u64))
    }

    public(friend) fun swap_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<SYCoin<X>> {

        let reserve_s = fixedU64::from_u64(vault::reserve_pt(vault));
        let reserve_t = fixedU64::from_u64(vault::reserve_sy(vault));
        let delta_s = fixedU64::from_u64(balance::value(&balance_pt));
        let t = vault::get_time_to_maturity(vault, clock);
        let delta_t = compute_delta_y(reserve_s, reserve_t, delta_s, t);

        let amount_target = fixedU64::floor(delta_t);
        vault::deposit_pt(vault, balance_pt);
        vault::withdraw_sy(vault, (amount_target as u64))
    }

    /// VAULT:
    ///     #SY: +100
    ///     #PT: +96
    /// LUKE:
    ///     #SY: -100
    ///     #PT: +4
    ///     #YT: +100
    public(friend) fun add_liquidity_from_tag<X>(
        bank: &mut Bank<X>,
        vault: &mut Vault<X>,
        coin_tag: Coin<X>,
        amount_pt_to_provide: u64,
        ctx: &mut TxContext,
    ): (Coin<PTCoin<X>>, Coin<YTCoin<X>>) {
        let amount_sy_to_provide = coin::value(&coin_tag);
        assert!(amount_pt_to_provide < amount_sy_to_provide, E_amount_pt_to_provider_must_be_greater_than_amount_sy);

        let coin_sy = bank::deposit_tag_to_mint_sy(bank, coin_tag, ctx);
        let (balance_pt_to_repay, balance_yt_to_repay) = vault::mint_pt_and_yt(vault, coin::into_balance(coin_sy));

        // let balance_sy_to_provide = bank::withdraw_sy(bank, amount_sy_to_provide);
        let balance_pt_to_provide = balance::split(&mut balance_pt_to_repay, amount_pt_to_provide);
        // add_liquidity(vault, balance_sy_to_provide, balance_pt_to_provide);
        vault::deposit_pt(vault, balance_pt_to_provide);

        (
            coin::from_balance(balance_pt_to_repay, ctx),
            coin::from_balance(balance_yt_to_repay, ctx),
        )
    }

    fun add_liquidity<X>(
        vault: &mut Vault<X>,
        balance_sy: Balance<SYCoin<X>>,
        balance_pt: Balance<PTCoin<X>>,
    ) {
        vault::deposit_sy(vault, balance_sy);
        vault::deposit_pt(vault, balance_pt);
    }
}
