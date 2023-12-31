#[allow(unused_field)]
module sharbet::stake_manager {
    use std::vector;

    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::linked_table::{Self, LinkedTable};
    use sui::object::{Self, ID, UID};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{Self, SuiSystemState};
    use sui_system::staking_pool::{Self, StakedSui};

    use sharbet::constants;

    friend sharbet::sha_manager;
    friend sharbet::unstsui;

    struct StakeProfile has key, store {
        id: UID,
        reserve_stakedsui: LinkedTable<ID, StakedSui>,
        amount_staked_sui: u64,
        amount_reward_sui: u64,
        pending_sui: Balance<SUI>,
    }

    fun init(ctx: &mut TxContext) {
        let stake_profile = StakeProfile {
            id: object::new(ctx),
            reserve_stakedsui: linked_table::new(ctx),
            amount_reward_sui: 0,
            amount_staked_sui: 0,
            pending_sui: balance::zero(),
        };

        transfer::public_share_object(stake_profile);
    }

    public fun amount_staked_sui(self: &StakeProfile): u64 {
        self.amount_staked_sui
    }

    public fun amount_reward_sui(self: &StakeProfile): u64 {
        self.amount_reward_sui
    }

    public fun amount_pending_sui(self: &StakeProfile): u64 {
        balance::value(&self.pending_sui)
    }

    public(friend) fun deposit_sui(self: &mut StakeProfile, coin_sui: Coin<SUI>) {
        let balance_sui = coin::into_balance(coin_sui);
        balance::join(&mut self.pending_sui, balance_sui);
    }

    public(friend) fun withdraw_sui(self: &mut StakeProfile, amount: u64): Balance<SUI> {
        let balance_sui = balance::split(&mut self.pending_sui, amount);
        balance_sui
    }

    fun withdraw_stakedsui(
        self: &mut StakeProfile,
        amount_requested: u64,
    ): vector<StakedSui> {
        let amount_withdrawn: u64 = 0;
        let stakedsui_list = vector::empty<StakedSui>();

        while (amount_withdrawn < amount_requested) {
            let (_key, stakedsui) = linked_table::pop_front(&mut self.reserve_stakedsui);
            let amount_stakedsui = staking_pool::staked_sui_amount(&stakedsui);
            vector::push_back(&mut stakedsui_list, stakedsui);
            amount_withdrawn = amount_withdrawn + amount_stakedsui;
        };

        self.amount_staked_sui = self.amount_staked_sui - amount_withdrawn;
        stakedsui_list
    }

    // TODO: Add amount to argument
    public(friend) fun stake_sui(
        self: &mut StakeProfile,
        wrapper: &mut SuiSystemState,
        validator_address: address,
        ctx: &mut TxContext,
    ) {
        let amount_pending_sui = amount_pending_sui(self);
        if (amount_pending_sui < constants::ONE_SUI()) {
            return
        };

        let balance_sui = withdraw_sui(self, constants::ONE_SUI());
        let stakedsui = request_add_stake_from_balance(wrapper, validator_address, balance_sui, ctx);
        self.amount_staked_sui = self.amount_staked_sui + staking_pool::staked_sui_amount(&stakedsui);
        linked_table::push_back(&mut self.reserve_stakedsui, object::id(&stakedsui), stakedsui);
    }

    public(friend) fun unstake_sui(
        self: &mut StakeProfile,
        amount_sui_requested: u64,
        wrapper: &mut SuiSystemState,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let stakedsui_list = withdraw_stakedsui(self, amount_sui_requested);
        let coin_sui_unstaked = unstake_sui_from_stakedsui_list(self, stakedsui_list, wrapper, ctx);
        let coin_sui_to_withdraw = coin::split(&mut coin_sui_unstaked, amount_sui_requested, ctx);
        deposit_sui(self, coin_sui_unstaked);

        coin_sui_to_withdraw
    }

    public fun unstake_sui_from_stakedsui_list(
        self: &mut StakeProfile,
        stakedsui_list: vector<StakedSui>,
        wrapper: &mut SuiSystemState,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let coin_sui_unstaked = request_withdraw_stake(wrapper, stakedsui_list, ctx);
        self.amount_staked_sui = self.amount_staked_sui - coin::value(&coin_sui_unstaked);
        coin_sui_unstaked
    }

    fun request_add_stake_from_balance(
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
        stakedsui_list: vector<StakedSui>,
        ctx: &mut TxContext,
    ): Coin<SUI>  {
        let balance_sui_unstaked = balance::zero<SUI>();

        while (!vector::is_empty(&stakedsui_list)) {
            let stakedsui = vector::pop_back(&mut stakedsui_list);
            let balance_sui = sui_system::request_withdraw_stake_non_entry(wrapper, stakedsui, ctx);
            balance::join(&mut balance_sui_unstaked, balance_sui);
        };
        vector::destroy_empty(stakedsui_list);

        coin::from_balance(balance_sui_unstaked, ctx)
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}
