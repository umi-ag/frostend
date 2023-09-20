#[allow(unused_field)]
module sharbet::sha_manager {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{SuiSystemState};

    use math::u64;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::stake_manager::{Self, StakeProfile};
    use sharbet::event_emit;
    // use sharbet::events::{EventDebug};


    fun init(_ctx: &TxContext) { }

    // public fun price_shasui_to_sui(
    //     self: &StakeProfile,
    //     treasury: &TreasuryCap<SHASUI>,
    // ): FixedPoint32 {
    //     fixedU32::div(
    //         fixedU32::from_u64(shasui::total_supply(treasury)),
    //         fixedU32::from_u64(
    //             stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self)
    //         ),
    //     )
    // }

    public fun mint_shasui(
        stake_profile: &mut StakeProfile,
        coin_sui: Coin<SUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        event_emit::debug(114);
        let coin_shasui = mint_shasui_from_amount_sui(stake_profile, &coin_sui, treasury_shasui, ctx);
        event_emit::vec(vector[1340, 1]);
        stake_manager::deposit_sui(stake_profile, coin_sui);
        event_emit::vec(vector[1340, 2]);
        stake_manager::stake_sui(stake_profile, wrapper, validator_address, ctx);
        event_emit::vec(vector[1340, 3]);
        coin_shasui
    }

    public fun burn_shasui(
        stake_profile: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        let amount_sui_to_withdraw = burn_shasui_into_amount_sui(stake_profile, coin_shasui, treasury_shasui, ctx);
        let coin_sui = stake_manager::unstake_sui(stake_profile, amount_sui_to_withdraw, wrapper, ctx);
        coin_sui
    }

    // TODO: Remove public
    public fun mint_shasui_from_amount_sui(
        self: &mut StakeProfile,
        coin_sui: &Coin<SUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Coin<SHASUI> {
        let amount_shasui_to_mint = compute_amount_shasui_to_mint(self, coin_sui, treasury_shasui);
        let coin_shasui = shasui::mint(treasury_shasui, amount_shasui_to_mint, ctx);
        coin_shasui
    }

    fun burn_shasui_into_amount_sui(
        self: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): u64 {
        let amount_sui_to_withdraw = compute_amount_sui_to_withdraw(self, &coin_shasui, treasury_shasui);
        shasui::burn(treasury_shasui, coin_shasui, ctx);
        amount_sui_to_withdraw
    }

    fun compute_amount_shasui_to_mint(
        self: &mut StakeProfile,
        coin_sui: &Coin<SUI>,
        treasury: &mut TreasuryCap<SHASUI>,
    ): u64 {
        let delta_x = coin::value(coin_sui);
        let x = stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self);
        let y = shasui::total_supply(treasury);

        if (x == 0) {
            delta_x
        } else {
            u64::mul_div(delta_x, y,x)
        }
    }

    fun compute_amount_sui_to_withdraw(
        self: &StakeProfile,
        coin_shasui: &Coin<SHASUI>,
        treasury: &mut TreasuryCap<SHASUI>,
    ): u64 {
        let delta_y = coin::value(coin_shasui);
        let x = stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self);
        let y = shasui::total_supply(treasury);

        if (y == 0) {
            delta_y
        } else {
            u64::mul_div(delta_y, x, y)
        }
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }
}
