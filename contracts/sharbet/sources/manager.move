#[allow(unused_use)]
module sharbet::manager {
    use std::vector;

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, TreasuryCap};
    use std::fixed_point32::{FixedPoint32};
    use sui::linked_table::{Self, LinkedTable};
    use sui::object::{Self, ID, UID};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::staking_pool::{Self, StakedSui};
    use sui_system::sui_system::{Self, SuiSystemState};

    use math::fixedU32;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::stake_utils;
    use sharbet::cvault::{Self, CVault};

    const ONE_SUI: u64 = 1_000_000_000;

    friend sharbet::main;

    public fun stake_sui_to_validator(
        cvault: &mut CVault,
        wrapper: &mut SuiSystemState,
        validator_address: address,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        balance_sui: Balance<SUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        cvault::deposit_sui(cvault, balance_sui);
        let amount_pending_sui = cvault::amount_pending_sui(cvault);
        if (amount_pending_sui < ONE_SUI) {
            return balance::zero()
        };

        let balance_pending_sui = cvault::withdraw_pending_sui(cvault, amount_pending_sui);
        let balnace_shasui = mint_shasui(cvault, balance_pending_sui, wrapper, treasury_shasui, validator_address, ctx);
        balnace_shasui
    }

    /// SUI -> shaSUI
    public fun mint_shasui(
        cvault: &mut CVault,
        balance_sui: Balance<SUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Balance<SHASUI> {
        let balance_shasui = cvault::mint_shasui_from_amount_sui(cvault, &balance_sui, treasury_shasui, ctx);
        let stakedsui = stake_utils::request_add_stake(wrapper, validator_address, balance_sui, ctx);
        cvault::deposit_stakedsui(cvault, stakedsui);
        balance_shasui
    }

    /// shaSUI -> SUI
    public fun burn_shasui(
        cvault: &mut CVault,
        balance_shasui: Balance<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Balance<SUI> {
        let amount_sui_to_withdraw = cvault::burn_shasui_into_amount_sui(cvault, balance_shasui, wrapper, treasury_shasui, ctx);

        let stakedsui_list = cvault::withdraw_stakedsui(cvault, amount_sui_to_withdraw);
        let balance_sui_unstaked = stake_utils::request_withdraw_stake(wrapper, stakedsui_list, ctx);
        let balance_sui_to_withdraw = balance::split(&mut balance_sui_unstaked, amount_sui_to_withdraw);

        // TODO: Use stake_sui_to_validator, not deposit_sui
        cvault::deposit_sui(cvault, balance_sui_unstaked);

        balance_sui_to_withdraw
    }

}
