// https://kiosk.page/transfer-policy/writing-rules.html?search=paywall
module frostend::utils {
    use sui::pay;
    use sui::transfer;
    use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{Self, TxContext};

    public fun merge_coins<R>(coins: vector<Coin<R>>, ctx: &mut TxContext): Coin<R> {
        let coin = coin::zero<R>(ctx);
        pay::join_vec(&mut coin, coins);
        coin
    }

    public fun return_remaining_coin<X>(
        coin: Coin<X>,
        ctx: &mut TxContext,
    ) {
        if (coin::value(&coin) == 0) {
            coin::destroy_zero(coin);
        } else {
            transfer::public_transfer(coin, tx_context::sender(ctx));
        };
    }

}
