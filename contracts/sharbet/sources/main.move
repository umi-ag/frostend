module sharbet::main {
    use std::option;
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

    const ONE_SUI: u64 = 1_000_000_000;

    struct ValidatorData has key, store {
        id: UID, // front end to grab and display data,
        staking_pool_id: ID, // The ID of the Validator's {StakingPool}
        staked_sui_table: LinkedTable<u64, StakedSui>, // activation_epoch => StakedSui
        total_principal: u64 // Total amount of StakedSui principal deposited in this validator
    }

    struct PoolStorage has key {
        id: UID,
        validators_table: LinkedTable<address, ValidatorData>, // We need a linked table to iterate through all validators once every epoch to ensure all pool data is accurate
        total_principal: u64, // Total amount of StakedSui principal deposited in Interest lst Package
    }

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
        wrapper: &mut SuiSystemState,
        cvault: &mut CVault,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        balance_shasui: Balance<SHASUI>,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let balance_sui = unstake_sui_from_validator(wrapper, cvault, treasury_shasui, balance_shasui, ctx);
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
            return balance::zero();
        };

        let balance_pending_sui = cvault::withdraw_pending_sui(cvault, amount_pending_sui);
        let stakedsui = request_add_stake(wrapper, validator_address, balance_pending_sui, ctx);
        let balnace_shasui = cvault::deposit_stakedsui_and_mint_shasui(cvault, stakedsui, treasury_shasui, ctx);
        balnace_shasui
    }

    fun unstake_sui_from_validator(
        wrapper: &mut SuiSystemState,
        cvault: &mut CVault,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        balance_shasui: Balance<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SUI> {
        let stakedsui = cvault::withdraw_stakedsui_and_burn_shasui(cvault, balance_shasui, treasury_shasui, ctx);
        let balance_sui = request_withdraw_stake(wrapper, stakedsui, ctx);
        balance_sui
    }

    fun request_add_stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        balance_sui: Balance<SUI>,
        ctx: &mut TxContext,
    ): StakedSui  {
        let coin_sui = coin::from_balance(balance_sui, ctx);
        sui_system::request_add_stake_non_entry(wrapper, coin_sui, validator_address, ctx)
    }

    fun request_withdraw_stake(
        wrapper: &mut SuiSystemState,
        stakedsui: StakedSui,
        ctx: &mut TxContext,
    ): Balance<SUI>  {
        sui_system::request_withdraw_stake_non_entry(wrapper, stakedsui, ctx)
    }

}
