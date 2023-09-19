module sharbet::main {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::object::{Self, UID, ID};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui_system::sui_system::{Self, SuiSystemState};

    use math::u64;

    use sharbet::shasui::{Self, SHASUI};
    use sharbet::cvault::{Self, CVault};

    fun init(ctx: &mut TxContext) {
    }

    public fun stake(
        cvault: &mut CVault,
        shasui_treasury: &mut TreasuryCap<SHASUI>,
        sui_coin: Coin<SUI>,
        ctx: &mut TxContext
    ): Coin<SHASUI> {
        // let sui_amount = coin::value(&coin_sui);
        let sui_balance = coin::into_balance(sui_coin);
        let sui_amount = balance::value(&sui_balance);

        let shasui_balance = cvault::mint_shasui(cvault, sui_balance, shasui_treasury, ctx);


        let shasui_coin = coin::from_balance(shasui_balance, ctx);
        shasui_coin
    }
}
