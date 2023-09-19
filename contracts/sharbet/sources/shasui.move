module sharbet::shasui {
    use std::option;

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::url::{Self, Url};

    friend sharbet::sha_manager;

    struct SHASUI has drop {}

    struct EventMint has copy, drop {
        amount: u64,
        user: address
    }

    struct EventBurn has copy, drop {
        amount: u64,
        user: address
    }

    fun init(witness: SHASUI, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = new(witness, ctx);
        transfer::public_freeze_object(metadata);
        transfer::public_share_object(treasury_cap);
    }

    fun new<X: drop>(witness: X, ctx: &mut TxContext)
    : (TreasuryCap<X>, CoinMetadata<X>) {
        let icon_url = b"https://github-production-user-asset-6210df.s3.amazonaws.com/14998939/268807230-05430fa7-777e-4d4e-9cea-b1a58b623b79.png";
        let (treasury_cap, metadata) = coin::create_currency(
            witness, 8,
            b"shaSUI",
            b"Sharbet Staked SUI",
            b"Sharbet Staked SUI",
            option::some<Url>(url::new_unsafe_from_bytes(icon_url)),
            ctx,
        );

        (treasury_cap, metadata)
    }

    public fun total_supply(treasury_cap: &TreasuryCap<SHASUI>): u64 {
        coin::total_supply(treasury_cap)
    }

    public(friend) fun mint(
        treasury_cap: &mut TreasuryCap<SHASUI>,
        amount: u64,
        ctx: &mut TxContext
    ): Coin<SHASUI> {
        event::emit(EventMint { amount: amount, user: tx_context::sender(ctx) });
        coin::mint(treasury_cap, amount, ctx)
    }

    public(friend) fun burn(
        treasury_cap: &mut TreasuryCap<SHASUI>,
        balance: Balance<SHASUI>,
        ctx: &mut TxContext
    ) {
        event::emit(EventBurn { amount: balance::value(&balance), user: tx_context::sender(ctx) });
        let coin = coin::from_balance(balance, ctx);
        coin::burn(treasury_cap, coin);
    }

    public fun transfer(treasury_cap: TreasuryCap<SHASUI>, recipient: address) {
        transfer::public_transfer(treasury_cap, recipient);
    }


    #[test_only]
    public fun test_init(ctx: &mut TxContext) {
        init(SHASUI {}, ctx)
    }
}
