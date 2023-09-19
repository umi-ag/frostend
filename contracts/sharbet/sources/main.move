module sharbet::main {
    use std::option;
    use std::vector;

    use std::debug::print;
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::linked_table::{Self, LinkedTable};
    use sui::object::{Self, UID, ID};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui_system::sui_system::{Self, SuiSystemState};
    use sui_system::staking_pool::{Self, StakedSui};

    use math::u64;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::cvault::{Self, CVault};
    use sharbet::stake_utils;

    const ONE_SUI: u64 = 1_000_000_000;

    fun init(_ctx: &TxContext) { }

    public fun stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        cvault: &mut CVault,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        coin_sui: Coin<SUI>,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        let balance_sui = coin::into_balance(coin_sui);
        cvault::deposit_sui(cvault, balance_sui);
        let balance_shasui = stake_sui_to_validator(wrapper, validator_address, cvault, treasury_shasui, ctx);
        let coin_shasui = coin::from_balance(balance_shasui, ctx);
        coin_shasui
    }

    public fun unstake(
        cvault: &mut CVault,
        coin_shasui: Coin<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let balance_shasui = coin::into_balance(coin_shasui);
        let balance_sui = cvault::burn_shasui(cvault, balance_shasui, wrapper, treasury_shasui, ctx);
        coin::from_balance(balance_sui, ctx)
    }

    fun stake_sui_to_validator(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        cvault: &mut CVault,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        let amount_pending_sui = cvault::amount_pending_sui(cvault);
        if (amount_pending_sui < ONE_SUI) {
            return balance::zero()
        };

        let balance_pending_sui = cvault::withdraw_pending_sui(cvault, amount_pending_sui);
        let balnace_shasui = cvault::mint_shasui(cvault, balance_pending_sui, wrapper, treasury_shasui, validator_address, ctx);
        balnace_shasui
    }
}
