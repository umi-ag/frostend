module sharbet::cvault {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, TreasuryCap};
    use std::fixed_point32::{FixedPoint32};
    use sui::object::{UID};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::staking_pool::{Self, StakedSui};
    use std::vector;

    use math::fixedU32;
    use sharbet::shasui::{Self, SHASUI};

    friend sharbet::main;

    struct CVault has key {
        id: UID,
        reserve_stakedsui: vector<StakedSui>,
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

        vector::push_back(&mut self.reserve_stakedsui, stakedsui);
        self.amount_staked_sui = self.amount_staked_sui + amount_stakedsui;
    }

    fun withdraw_stakedsui(
        self: &mut CVault,
    ): StakedSui {
        let stakedsui = vector::pop_back(&mut self.reserve_stakedsui);

        let amount_stakedsui = staking_pool::staked_sui_amount(&stakedsui);
        self.amount_staked_sui = self.amount_staked_sui - amount_stakedsui;

        stakedsui
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

    fun burn_shasui_into_amount_sui(
        self: &CVault,
        balance_shasui: Balance<SHASUI>,
        treasury: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): u64 {
        let amount_shasui = balance::value(&balance_shasui);
        let amount_sui = fixedU32::floor(
            fixedU32::div(
                fixedU32::from_u64(amount_shasui),
                price_shasui_to_sui(self, treasury)
            )
        );
        shasui::burn(treasury, balance_shasui, ctx);
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

    public(friend) fun withdraw_stakedsui_and_burn_shasui(
        self: &mut CVault,
        balance_shasui: Balance<SHASUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): StakedSui {
        let amount_sui = burn_shasui_into_amount_sui(self, balance_shasui, treasury_shasui, ctx);
        // TODO: Use amount_sui
        let stakedsui = withdraw_stakedsui(self);

        stakedsui
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
