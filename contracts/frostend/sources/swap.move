module frostend::swap {
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::tx_context::{TxContext};

    use frostend::coin_utils::merge_coins;
    use frostend::actions;
    use frostend::vault::{Vault, PTCoin, YTCoin};
    use frostend::bank::{Bank};

    fun init(_ctx: &TxContext) { }

    public fun swap_sy_to_pt<X>(
        coins_sy: vector<Coin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<PTCoin<X>> {
        let coin_sy = merge_coins(coins_sy, ctx);
        let balance_sy = coin::into_balance(coin_sy);
        let balance_pt = actions::swap_sy_to_pt_(balance_sy, vault, clock);
        coin::from_balance(balance_pt, ctx)
    }

    public fun swap_pt_to_sy<X>(
        coins_pt: vector<Coin<PTCoin<X>>>,
        vault: &mut Vault<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<X> {
        let coin_pt = merge_coins(coins_pt, ctx);
        let balance_pt = coin::into_balance(coin_pt);
        let balance_sy = actions::swap_pt_to_sy_(balance_pt, vault, clock);
        coin::from_balance(balance_sy, ctx)
    }

    public fun swap_sy_to_yt<X>(
        coins_sy: vector<Coin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<YTCoin<X>> {
        let coin_sy = merge_coins(coins_sy, ctx);
        let balance_sy = coin::into_balance(coin_sy);
        let balance_yt = actions::swap_sy_to_yt_(balance_sy, vault, bank, clock);
        coin::from_balance(balance_yt, ctx)
    }

    public fun swap_yt_to_sy<X>(
        coins_yt: vector<Coin<YTCoin<X>>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): Coin<X> {
        let coin_yt = merge_coins(coins_yt, ctx);
        let balance_yt = coin::into_balance(coin_yt);
        let balance_sy = actions::swap_yt_to_sy_(balance_yt, vault, bank);
        coin::from_balance(balance_sy, ctx)
    }

    public fun swap_pt_to_yt<X>(
        coins_pt: vector<Coin<PTCoin<X>>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): Coin<YTCoin<X>> {
        let coin_pt = merge_coins(coins_pt, ctx);
        let balance_pt = coin::into_balance(coin_pt);
        let balance_yt = actions::swap_pt_to_yt_(balance_pt, vault, bank);
        coin::from_balance(balance_yt, ctx)
    }

    public fun swap_yt_to_pt<X>(
        coins_yt: vector<Coin<YTCoin<X>>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): Coin<PTCoin<X>> {
        let coin_yt = merge_coins(coins_yt, ctx);
        let balance_yt = coin::into_balance(coin_yt);
        let balance_pt = actions::swap_yt_to_pt_(balance_yt, vault, bank);
        coin::from_balance(balance_pt, ctx)
    }

}
