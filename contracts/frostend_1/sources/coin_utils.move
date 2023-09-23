module frostend::coin_utils {
    use sui::pay;
    use sui::transfer;
    use sui::coin::{Self, Coin};
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

    public fun maybe_split_coin_and_transfer_rest<R>(
        coin_in: Coin<R>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ): Coin<R> {
        if (coin::value(&coin_in) == amount) {
            return coin_in
        };

        let coin_out = coin::split(&mut coin_in, amount, ctx);
        transfer::public_transfer(coin_in, recipient);

        coin_out
    }

    public fun maybe_split_coins_and_transfer_rest<R>(
        coins_in: vector<Coin<R>>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ): Coin<R> {
        let coin_in = merge_coins(coins_in, ctx);
        maybe_split_coin_and_transfer_rest(coin_in, amount, recipient, ctx)
    }
}
