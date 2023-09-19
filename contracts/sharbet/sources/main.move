#[allow(unused_field)]
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
    use sharbet::sha_manager::{Self};
    use sharbet::stake_manager::{Self, StakeProfile};

    fun init(_ctx: &TxContext) { }

    public fun stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        stake_profile: &mut StakeProfile,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        coin_sui: Coin<SUI>,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        let balance_sui = coin::into_balance(coin_sui);
        let balance_shasui = sha_manager::mint_shasui(stake_profile, balance_sui, wrapper, treasury_shasui, validator_address, ctx);
        let coin_shasui = coin::from_balance(balance_shasui, ctx);
        coin_shasui
    }

    public fun unstake(
        stake_profile: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let balance_shasui = coin::into_balance(coin_shasui);
        let balance_sui = sha_manager::burn_shasui(stake_profile, balance_shasui, wrapper, treasury_shasui, validator_address, ctx);
        coin::from_balance(balance_sui, ctx)
    }
}
