module frostend::amm {
    use std::ascii::String;
    use std::type_name;
    use std::vector;

    use sui::object::{Self, UID, ID};
    use sui::balance::{Self, Supply, Balance};
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;
    use sui::event;
    use sui::math;
    use sui::transfer;
    use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
    use sui::tx_context::{Self, TxContext};

    use frostend::utils;

    /// When contract error
    const ERR_INTERNAL_ERROR: u64 = 102;
    /// When user is not admin
    const ERR_FORBIDDEN: u64 = 103;
    /// When not enough amount for pool
    const ERR_INSUFFICIENT_AMOUNT: u64 = 104;
    /// When not enough liquidity amount
    const ERR_INSUFFICIENT_LIQUIDITY: u64 = 105;
    /// When not enough liquidity minted
    const ERR_INSUFFICIENT_LIQUIDITY_MINT: u64 = 106;
    /// When not enough liquidity burned
    const ERR_INSUFFICIENT_LIQUIDITY_BURN: u64 = 107;
    /// When not enough X amount
    const ERR_INSUFFICIENT_X_AMOUNT: u64 = 108;
    /// When not enough Y amount
    const ERR_INSUFFICIENT_Y_AMOUNT: u64 = 109;
    /// When not enough input amount
    const ERR_INSUFFICIENT_INPUT_AMOUNT: u64 = 110;
    /// When not enough output amount
    const ERR_INSUFFICIENT_OUTPUT_AMOUNT: u64 = 111;
    /// When contract K error
    const ERR_K_ERROR: u64 = 112;
    /// When already exists on account
    const ERR_PAIR_ALREADY_EXIST: u64 = 115;
    /// When not exists on account
    const ERR_PAIR_NOT_EXIST: u64 = 116;
    /// When error loan amount
    const ERR_LOAN_ERROR: u64 = 117;
    /// When contract is not reentrant
    const ERR_LOCK_ERROR: u64 = 118;
    /// When pair has wrong ordering
    const ERR_PAIR_ORDER_ERROR: u64 = 119;
    /// When contract is paused
    const ERR_PAUSABLE_ERROR: u64 = 120;
    /// When input value not satisfied
    const ERR_INPUT_VALUE: u64 = 121;

    const MINIMUM_LIQUIDITY: u64 = 1000;

    struct LPCoin<phantom X, phantom Y> has drop {}

    struct LiquidityPool<phantom X, phantom Y> has key, store {
        id: UID,
        coin_x_reserve: Balance<X>,
        coin_y_reserve: Balance<Y>,
        coin_lp_reserve: Balance<LPCoin<X, Y>>,
        lp_supply: Supply<LPCoin<X, Y>>,
        last_block_timestamp: u64,
        last_price_x_cumulative: u128,
        last_price_y_cumulative: u128,
        k_last: u128,
        locked: bool,
    }

    struct PairMeta has drop, store, copy {
        coin_x: String,
        coin_y: String,
    }

    struct PairInfo has store, copy, drop {
        pair_list: vector<PairMeta>,
    }

    struct LiquidityPoolBook has key, store {
        id: UID,
        // pair_info: PairInfo
    }

    public fun get_lp_name<X, Y>(): String {
        type_name::into_string(type_name::get<LPCoin<X, Y>>())
    }


    fun init(ctx: &mut TxContext) {
        let book = LiquidityPoolBook {
            id: object::new(ctx),
        };
        transfer::public_share_object(book);
    }

    // X is SY, standard yield
    // Y is FY, fixed yield
    // LP is VY, variable yield
    public fun create_pool<X, Y>(
        book: &mut LiquidityPoolBook,
        ctx: &mut TxContext
    ) {
        let pool = LiquidityPool<X, Y> {
            id: object::new(ctx),
            coin_x_reserve: balance::zero<X>(),
            coin_y_reserve: balance::zero<Y>(),
            coin_lp_reserve: balance::zero(),
            lp_supply: balance::create_supply(LPCoin<X, Y> {}),
            last_block_timestamp: 0,
            last_price_x_cumulative: 0,
            last_price_y_cumulative: 0,
            k_last: 0,
            locked: false,
        };
        dof::add(&mut book.id, get_lp_name<X, Y>(), pool);
    }

    /// require X < Y
    public entry fun add_liquidity_entry<X, Y>(
        book: &mut LiquidityPoolBook,
        clock: &Clock,
        coin_x_origin: Coin<X>,
        coin_y_origin: Coin<Y>,
        amount_x_desired: u64,
        amount_y_desired: u64,
        amount_x_min: u64,
        amount_y_min: u64,
        ctx: &mut TxContext,
    ) {
        // // check pair exists first
        // if (!check_pair_exist<X, Y>(lps)) {
        //     create_pair<X, Y>(lps, ctx);
        // };
        // add lp
        let coin_lp = add_liquidity<X, Y>(
            book,
            clock,
            coin_x_origin,
            coin_y_origin,
            amount_x_desired,
            amount_y_desired,
            amount_x_min,
            amount_y_min,
            ctx,
        );
        transfer::public_transfer(coin_lp, tx_context::sender(ctx));
    }


    public fun add_liquidity<X, Y>(
        book: &mut LiquidityPoolBook,
        clock: &Clock,
        coin_x_origin: Coin<X>,
        coin_y_origin: Coin<Y>,
        amount_x_desired: u64,
        amount_y_desired: u64,
        amount_x_min: u64,
        amount_y_min: u64,
        ctx: &mut TxContext,
    ): Coin<LPCoin<X, Y>> {
        let amt_x = coin::value(&coin_x_origin);
        let amt_y = coin::value(&coin_y_origin);

        assert!(amt_x >= amount_x_desired
            && amount_x_desired >= amount_x_min
            && amount_x_min > 0,
            ERR_INSUFFICIENT_X_AMOUNT);
        assert!(amt_y >= amount_y_desired
            && amount_y_desired >= amount_y_min
            && amount_y_min > 0,
            ERR_INSUFFICIENT_Y_AMOUNT);

        let (amount_x, amount_y) = (0, 0);
            // calc_optimal_coin_values<X, Y>(book, amount_x_desired, amount_y_desired, amount_x_min, amount_y_min);
        let coin_x = coin::split(&mut coin_x_origin, amount_x, ctx);
        let coin_y = coin::split(&mut coin_y_origin, amount_y, ctx);
        let lp_balance = mint_lp<X, Y>(book, coin::into_balance<X>(coin_x), coin::into_balance<Y>(coin_y), clock);
        let lp_coins = coin::from_balance<LPCoin<X, Y>>(lp_balance, ctx);
        utils::return_remaining_coin(coin_x_origin, ctx);
        utils::return_remaining_coin(coin_y_origin, ctx);
        lp_coins
    }

    public fun borrow_mut_pool<X, Y>(
        book: &mut LiquidityPoolBook,
    ): (&mut LiquidityPool<X, Y>) {
        let pool = dof::borrow_mut<String, LiquidityPool<X, Y>>(
            &mut book.id, get_lp_name<X, Y>()
        );
        pool
    }

    public fun get_reserves_size<X, Y>(pool: &LiquidityPool<X, Y>): (u64, u64) {
        (balance::value(&pool.coin_x_reserve), balance::value(&pool.coin_y_reserve))
    }

    public fun mint_lp<X, Y>(
        book: &mut LiquidityPoolBook,
        balance_x: Balance<X>,
        balance_y: Balance<Y>,
        clock: &Clock,
    ): Balance<LPCoin<X, Y>> {
        // assert_lp_unlocked<X, Y>(lps);
        // assert_not_paused(lps);
        // feeOn

        // let fee_on = mint_fee_internal<X, Y>(lps);
        let pool = borrow_mut_pool<X, Y>(book);
        let amount_x = balance::value(&balance_x);
        let amount_y = balance::value(&balance_y);
        let (reserve_x, reserve_y) = get_reserves_size(pool);
        balance::join<X>(&mut pool.coin_x_reserve, balance_x);
        balance::join<Y>(&mut pool.coin_y_reserve, balance_y);

        let total_supply = balance::supply_value<LPCoin<X, Y>>(&pool.lp_supply);
        let (balance_x, balance_y) = get_reserves_size(pool);

        let liquidity;
        if (total_supply == 0) {
            liquidity = math::sqrt(amount_x * amount_y) - MINIMUM_LIQUIDITY;
            let balance_reserve = balance::increase_supply(&mut pool.lp_supply, MINIMUM_LIQUIDITY);
            // balance::join(&mut pool.lp_coin_reserve, balance_reserve);
        } else {
            let amount_1 = ((amount_x as u128) * (total_supply as u128) / (reserve_x as u128) as u64);
            let amount_2 = ((amount_y as u128) * (total_supply as u128) / (reserve_y as u128) as u64);
            liquidity = math::min(amount_1, amount_2);
        };
        assert!(liquidity > 0, ERR_INSUFFICIENT_LIQUIDITY_MINT);

        let balance_lp = balance::increase_supply(&mut pool.lp_supply, liquidity);
        // update internal
        // update_internal<X, Y>(pool, clock, balance_x, balance_y, reserve_x, reserve_y);
        // feeOn
        // if (fee_on) pool.k_last = (balance_x as u128) * (balance_y as u128);
        // event
        // event::emit(MintEvent<X, Y> {
        //     amount_x,
        //     amount_y,
        //     liquidity,
        // });

        balance_lp
    }

}
