module frostend::stsui_coin {
    use std::option;

    use sui::coin::{Self, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct STSUI_COIN has drop {}

    fun init(witness: STSUI_COIN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<STSUI_COIN>(
            witness, 8,
            b"stSUI",
            b"Staking SUI",
            b"Staking SUI",
            option::none(),
            ctx,
        );
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury_cap, tx_context::sender(ctx))
    }

    public entry fun mint(treasury_cap: &mut TreasuryCap<STSUI_COIN>, amount: u64, ctx: &mut TxContext) {
        let coin = coin::mint<STSUI_COIN>(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, tx_context::sender(ctx));
    }

    public entry fun transfer(treasury_cap: TreasuryCap<STSUI_COIN>, recipient: address) {
        transfer::public_transfer(treasury_cap, recipient);
    }
}
