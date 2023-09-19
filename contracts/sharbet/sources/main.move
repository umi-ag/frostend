module sharbet::main {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::object::{Self, UID, ID};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui_system::sui_system::{Self, SuiSystemState};
    use sui_system::staking_pool::StakedSui;

    use math::u64;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::cvault::{Self, CVault};

    const ONE_SUI: u64 = 1_000_000_000;


    fun init(ctx: &mut TxContext) {
    }

    public fun stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        cvault: &mut CVault,
        shasui_treasury: &mut TreasuryCap<SHASUI>,
        sui_coin: Coin<SUI>,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        let sui_balance = coin::into_balance(sui_coin);
        cvault::deposit_sui(cvault, sui_balance);
        let shasui_balance = stake_sui_to_validator(wrapper, validator_address, cvault, shasui_treasury, ctx);
        let shasui_coin = coin::from_balance(shasui_balance, ctx);
        shasui_coin
    }

    fun stake_sui_to_validator(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        cvault: &mut CVault,
        shasui_treasury: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        let amount_pending_sui = cvault::amount_pending_sui(cvault);
        if (amount_pending_sui < ONE_SUI) {
            return balance::zero();
        };

        let balance_pending_sui = cvault::withdraw_pending_sui(cvault, amount_pending_sui);
        let stakedsui = request_add_stake(wrapper, validator_address, balance_pending_sui, ctx);
        let balnace_shasui = cvault::deposit_stakedsui_and_mint_shasui(cvault, stakedsui, shasui_treasury, ctx);
        balnace_shasui
    }

    fun request_add_stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        sui_balance: Balance<SUI>,
        ctx: &mut TxContext,
    ): StakedSui  {
        let sui_coin = coin::from_balance(sui_balance, ctx);
        sui_system::request_add_stake_non_entry(wrapper, sui_coin, validator_address, ctx)
    }
}
