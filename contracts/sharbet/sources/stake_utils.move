#[allow(unused_field)]
module sharbet::stake_utils {
    use std::vector;

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{Self, SuiSystemState};
    use sui_system::staking_pool::{Self, StakedSui};

    fun init(_ctx: &TxContext) { }

    public fun request_add_stake(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        balance_sui: Balance<SUI>,
        ctx: &mut TxContext,
    ): StakedSui  {
        let coin_sui = coin::from_balance(balance_sui, ctx);
        sui_system::request_add_stake_non_entry(wrapper, coin_sui, validator_address, ctx)
    }

    public fun request_withdraw_stake(
        wrapper: &mut SuiSystemState,
        stakedsui_list: vector<StakedSui>,
        ctx: &mut TxContext,
    ): Balance<SUI>  {
        let balance_sui_unstaked = balance::zero<SUI>();

        while (!vector::is_empty(&stakedsui_list)) {
            let stakedsui = vector::pop_back(&mut stakedsui_list);
            let balance_sui = sui_system::request_withdraw_stake_non_entry(wrapper, stakedsui, ctx);
            balance::join(&mut balance_sui_unstaked, balance_sui);
        };
        vector::destroy_empty(stakedsui_list);

        balance_sui_unstaked
    }
}
