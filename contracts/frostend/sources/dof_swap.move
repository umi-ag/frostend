module frostend::dof_swap {
    use sui::coin::{Self, Coin};
    use sui::tx_context::{TxContext};

    use frostend::actions;
    use frostend::vault::{Vault, PTCoin, YTCoin};
    use frostend::bank::{Bank};
    use frostend::dof_root::{Self, Root};
    use frostend::utils::merge_coins;

    fun init(ctx: &mut TxContext) {

    }

    // public fun swap_sy_to_pt<X>(
    //     coins_sy: vector<Coin<X>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<PTCoin<X>> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);

    //     let coin_sy = merge_coins(coins_sy, ctx);
    //     let balance_sy = coin::into_balance(coin_sy);
    //     let balance_pt = actions::swap_sy_to_pt_(balance_sy, vault, bank);
    //     coin::from_balance(balance_pt, ctx)
    // }

    // public fun swap_pt_to_sy<X>(
    //     coins_pt: vector<Coin<PTCoin<X>>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<X> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);

    //     let coin_pt = merge_coins(coins_pt, ctx);
    //     let balance_pt = coin::into_balance(coin_pt);
    //     let balance_sy = actions::swap_pt_to_sy_(balance_pt, vault, bank);
    //     coin::from_balance(balance_sy, ctx)
    // }

    // public fun swap_sy_to_yt<X>(
    //     coins_sy: vector<Coin<X>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<YTCoin<X>> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);

    //     let coin_sy = merge_coins(coins_sy, ctx);
    //     let balance_sy = coin::into_balance(coin_sy);
    //     let balance_yt = actions::swap_sy_to_yt_(balance_sy, vault, bank);
    //     coin::from_balance(balance_yt, ctx)
    // }

    // public fun swap_yt_to_sy<X>(
    //     coins_yt: vector<Coin<YTCoin<X>>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<X> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);


    //     let coin_yt = merge_coins(coins_yt, ctx);
    //     let balance_yt = coin::into_balance(coin_yt);
    //     let balance_sy = actions::swap_yt_to_sy_(balance_yt, vault, bank);
    //     coin::from_balance(balance_sy, ctx)
    // }

    // public fun swap_pt_to_yt<X>(
    //     coins_pt: vector<Coin<PTCoin<X>>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<YTCoin<X>> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);

    //     let coin_pt = merge_coins(coins_pt, ctx);
    //     let balance_pt = coin::into_balance(coin_pt);
    //     let balance_yt = actions::swap_pt_to_yt_(balance_pt, vault, bank);
    //     coin::from_balance(balance_yt, ctx)
    // }

    // public fun swap_yt_to_pt<X>(
    //     coins_yt: vector<Coin<YTCoin<X>>>,
    //     root: &mut Root,
    //     ctx: &mut TxContext,
    // ): Coin<PTCoin<X>> {
    //     let bank = dof_root::borrow_mut_bank<X>(root);
    //     let vault = dof_root::borrow_mut_vault<X>(root);

    //     let coin_yt = merge_coins(coins_yt, ctx);
    //     let balance_yt = coin::into_balance(coin_yt);
    //     let balance_pt = actions::swap_yt_to_pt_(balance_yt, vault, bank);
    //     coin::from_balance(balance_pt, ctx)
    // }
}
