#[allow(unused_field)]
module sharbet::cvault {
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

    friend sharbet::main;

    struct CVault has key {
        id: UID,
        reserve_stakedsui: LinkedTable<ID, StakedSui>,
        pending_sui: Balance<SUI>,
        amount_staked_sui: u64,
        amount_reward_sui: u64,
    }

    public fun amount_staked_sui(self: &CVault): u64 {
        self.amount_staked_sui
    }

    public fun amount_reward_sui(self: &CVault): u64 {
        self.amount_reward_sui
    }

    public fun amount_pending_sui(self: &CVault): u64 {
        balance::value(&self.pending_sui)
    }

    public(friend) fun deposit_sui(self: &mut CVault, balance_sui: Balance<SUI>) {
        balance::join(&mut self.pending_sui, balance_sui);
    }

    fun deposit_stakedsui(
        self: &mut CVault,
        stakedsui: StakedSui
    ) {
        let amount_stakedsui = staking_pool::staked_sui_amount(&stakedsui);
        linked_table::push_back(&mut self.reserve_stakedsui, object::id(&stakedsui), stakedsui);
        self.amount_staked_sui = self.amount_staked_sui + amount_stakedsui;
    }

    fun withdraw_stakedsui(
        self: &mut CVault,
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

    /// shaSUI -> SUI
    public(friend) fun burn_shasui(
        self: &mut CVault,
        balance_shasui: Balance<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Balance<SUI> {
        let amount_sui_to_withdraw = compute_amount_sui_to_withdraw(self, &balance_shasui, treasury_shasui);
        shasui::burn(treasury_shasui, balance_shasui, ctx);

        let stakedsui_list = withdraw_stakedsui(self, amount_sui_to_withdraw);
        let balance_sui_unstaked = stake_utils::request_withdraw_stake(wrapper, stakedsui_list, ctx);
        let balance_sui_to_withdraw = balance::split(&mut balance_sui_unstaked, amount_sui_to_withdraw);
        deposit_sui(self, balance_sui_unstaked);

        balance_sui_to_withdraw
    }

    fun mint_shasui_from_amount_sui(
        self: &mut CVault,
        sui_amount: u64,
        treasury: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        let amount_shasui_to_mint = fixedU32::floor(
            fixedU32::mul(
                fixedU32::from_u64(sui_amount),
                price_shasui_to_sui(self, treasury)
            )
        );

        let coin_shasui = shasui::mint(treasury, amount_shasui_to_mint, ctx);
        coin::into_balance(coin_shasui)
    }

    fun compute_amount_sui_to_withdraw(
        self: &CVault,
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

    public(friend) fun deposit_stakedsui_and_mint_shasui(
        self: &mut CVault,
        stakedsui: StakedSui,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Balance<SHASUI> {
        let amount_stakedsui = staking_pool::staked_sui_amount(&stakedsui);
        deposit_stakedsui(self, stakedsui);
        let balance_shasui = mint_shasui_from_amount_sui(self, amount_stakedsui, treasury_shasui, ctx);

        balance_shasui
    }

    public(friend) fun withdraw_pending_sui(
        self: &mut CVault,
        amount: u64,
    ): Balance<SUI> {
        balance::split(&mut self.pending_sui, amount)
    }

    public fun price_shasui_to_sui(
        self: &CVault,
        treasury: &TreasuryCap<SHASUI>,
    ): FixedPoint32 {
        fixedU32::div(
            fixedU32::from_u64(shasui::total_supply(treasury)),
            fixedU32::from_u64(
                amount_staked_sui(self) + amount_reward_sui(self)
            ),
        )
    }
}
