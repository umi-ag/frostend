module sharbet::cvault {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use std::fixed_point32::{Self, FixedPoint32};
    use sui::object::{Self, UID, ID};
    use sui::sui::{SUI};
    use sui::tx_context::{Self, TxContext};
    use sui_system::staking_pool::{Self, StakedSui};
    use std::vector;

    use math::fixedU32;
    use sharbet::shasui::{Self, SHASUI};

    friend sharbet::main;

    struct CVault has key {
        id: UID,
        reserve_sui: Balance<SUI>,
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

    public(friend) fun deposit_sui(self: &mut CVault, sui_balance: Balance<SUI>) {
        balance::join(&mut self.reserve_sui, sui_balance);
    }

    public(friend) fun deposit_stakedsui(
        self: &mut CVault,
        stakedsui: StakedSui
    ) {
        let amount_stakedsui = staking_pool::staked_sui_amount(&stakedsui);

        vector::push_back(&mut self.reserve_stakedsui, stakedsui);
        self.amount_staked_sui = self.amount_staked_sui + amount_stakedsui;
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

    public(friend) fun mint_shasui(
        self: &mut CVault,
        sui_balance: Balance<SUI>,
        treasury: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Balance<SHASUI> {
        let sui_amount = balance::value(&sui_balance);
        let shasui_amount = fixedU32::floor(
            fixedU32::mul(
                fixedU32::from_u64(sui_amount),
                price_shasui_to_sui(self, treasury)
            )
        );


        deposit_sui(self, sui_balance);

        let shasui_coin = shasui::mint(treasury, shasui_amount, ctx);
        coin::into_balance(shasui_coin)
    }

    // public fun burn_shasui(
    //     self: &CVault,
    //     sui_balance: &Balance<SUI>,
    //     treasury: &TreasuryCap<SHASUI>,
    //     ctx: &mut TxContext
    // ): u64 {
    //     let shasui_amount = balance::value(shasui_balance);
    //     let sui_amount = fixedU32::floor(
    //         fixedU32::div(
    //             fixedU32::from_u64(shasui_amount),
    //             price_shasui_to_sui(self, treasury)
    //         )
    //     );

    //     shasui_amount
    // }
}
