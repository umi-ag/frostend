// https://kiosk.page/transfer-policy/writing-rules.html?search=paywall
module frostend::utils {
    use sui::pay;

    // skipping dependencies
    use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::tx_context::TxContext;

    public fun merge_coins<R>(coins: vector<Coin<R>>, ctx: &mut TxContext): Coin<R> {
        let coin = coin::zero<R>(ctx);
        pay::join_vec(&mut coin, coins);
        coin
    }
}
