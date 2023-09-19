#[allow(unused_field)]
module sharbet::sha_manager {
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
    use sharbet::stake_manager::{Self, StakeProfile};


    fun init(_ctx: &TxContext) { }


    public fun price_shasui_to_sui(
        self: &StakeProfile,
        treasury: &TreasuryCap<SHASUI>,
    ): FixedPoint32 {
        fixedU32::div(
            fixedU32::from_u64(shasui::total_supply(treasury)),
            fixedU32::from_u64(
                stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self)
            ),
        )
    }

    public fun mint_shasui(
        stake_profile: &mut StakeProfile,
        balance_sui: Balance<SUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Balance<SHASUI> {
        let balance_shasui = mint_shasui_from_amount_sui(stake_profile, &balance_sui, treasury_shasui, ctx);
        stake_manager::deposit_sui(stake_profile, balance_sui);
        stake_manager::stake_sui(stake_profile, wrapper, validator_address, ctx);
        balance_shasui
    }

    public fun burn_shasui(
        stake_profile: &mut StakeProfile,
        balance_shasui: Balance<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Balance<SUI> {
        let amount_sui_to_withdraw = burn_shasui_into_amount_sui(stake_profile, balance_shasui, wrapper, treasury_shasui, ctx);
        let balance_sui = stake_manager::unstake_sui(stake_profile, amount_sui_to_withdraw, wrapper, validator_address, ctx);
        balance_sui
    }

    fun mint_shasui_from_amount_sui(
        self: &mut StakeProfile,
        balance_sui: &Balance<SUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        let amount_shasui_to_mint = compute_amount_shasui_to_mint(self, balance_sui, treasury_shasui, ctx);
        let coin_shasui = shasui::mint(treasury_shasui, amount_shasui_to_mint, ctx);
        coin::into_balance(coin_shasui)
    }

    fun burn_shasui_into_amount_sui(
        self: &mut StakeProfile,
        balance_shasui: Balance<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): u64 {
        let amount_sui_to_withdraw = compute_amount_sui_to_withdraw(self, &balance_shasui, treasury_shasui);
        shasui::burn(treasury_shasui, balance_shasui, ctx);
        amount_sui_to_withdraw
    }

    fun compute_amount_shasui_to_mint(
        self: &mut StakeProfile,
        balance_sui: &Balance<SUI>,
        treasury: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): u64 {
        let amount_sui = balance::value(balance_sui);
        let amount_shasui_to_mint = fixedU32::floor(
            fixedU32::mul(
                fixedU32::from_u64(amount_sui),
                price_shasui_to_sui(self, treasury)
            )
        );
        amount_shasui_to_mint
    }

    fun compute_amount_sui_to_withdraw(
        self: &StakeProfile,
        balance_shasui: &Balance<SHASUI>,
        treasury_shasui: &TreasuryCap<SHASUI>,
    ): u64 {
        let amount_shasui = balance::value(balance_shasui);
        let amount_sui = fixedU32::floor(
            fixedU32::div(
                fixedU32::from_u64(amount_shasui),
                price_shasui_to_sui(self, treasury_shasui)
            )
        );
        amount_sui
    }
}
