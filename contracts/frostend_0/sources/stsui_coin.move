module frostend::stsui_coin {
    use std::option;

    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct STSUI_COIN has drop {}

    fun init(witness: STSUI_COIN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = new(witness, ctx);
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx))
    }

    fun new<X: drop>(witness: X, ctx: &mut TxContext)
    : (TreasuryCap<X>, CoinMetadata<X>) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness, 8,
            b"stSUI",
            b"Staking SUI",
            b"Staking SUI",
            option::none(),
            ctx,
        );

        (treasury_cap, metadata)
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<STSUI_COIN>, amount: u64, ctx: &mut TxContext
    ): Coin<STSUI_COIN> {
        coin::mint<STSUI_COIN>(treasury_cap, amount, ctx)
    }

    public fun mint_to(treasury_cap: &mut TreasuryCap<STSUI_COIN>, amount: u64, ctx: &mut TxContext) {
        let coin = mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, tx_context::sender(ctx));
    }

    public fun transfer(treasury_cap: TreasuryCap<STSUI_COIN>, recipient: address) {
        transfer::public_transfer(treasury_cap, recipient);

    }


    #[test_only]
    public fun test_init(ctx: &mut TxContext) {
        init(STSUI_COIN {}, ctx)
    }
}
