#[allow(unused_field)]
module sharbet::sha_manager {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{SuiSystemState};

    use math::u64;
    use sharbet::constants::{MAX_U64};
    use sharbet::errors;
    use sharbet::event_emit;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::stake_manager::{Self, StakeProfile};
    use sharbet::unstsui::{Self, UnstakeTicket, UnstSuiTreasuryCap};

    friend sharbet::actions;

    /// SUI -> shaSUI
    public(friend) fun stake_sui_to_mint_shasui(
        stake_profile: &mut StakeProfile,
        coin_sui: Coin<SUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        event_emit::debug(114);
        let coin_shasui = mint_shasui_from_amount_sui(stake_profile, coin::value(&coin_sui), treasury_shasui, ctx);
        event_emit::vec(vector[1340, 1]);
        stake_manager::deposit_sui(stake_profile, coin_sui);
        event_emit::vec(vector[1340, 2]);
        stake_manager::stake_sui(stake_profile, wrapper, validator_address, ctx);
        event_emit::vec(vector[1340, 3]);
        coin_shasui
    }

    /// shaSUI -> unstSUI
    public(friend) fun burn_shasui_to_mint_unstsui(
        stake_profile: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        treasury_unstsui: &mut UnstSuiTreasuryCap,
        ctx: &mut TxContext,
    ): UnstakeTicket {
        let amount_sui_to_withdraw = burn_shasui_into_amount_sui(stake_profile, coin_shasui, treasury_shasui, ctx);
        let unstake_ticket = unstsui::mint(treasury_unstsui, amount_sui_to_withdraw, MAX_U64(), ctx);
        unstake_ticket
    }

    /// unstSUI -> SUI
    public(friend) fun burn_unstsui_to_unstake_sui(
        stake_profile: &mut StakeProfile,
        unstsui: UnstakeTicket,
        wrapper: &mut SuiSystemState,
        treasury_unstsui: &mut UnstSuiTreasuryCap,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        assert!(unstsui::is_unlocked(&unstsui, ctx), errors::E_TICKET_LOCKED());

        let amount_sui_to_unstake = unstsui::burn(treasury_unstsui, unstsui);
        let coin_sui = stake_manager::unstake_sui(stake_profile, amount_sui_to_unstake, wrapper, ctx);
        coin_sui
    }

    fun mint_shasui_from_amount_sui(
        self: &mut StakeProfile,
        amount_sui: u64,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext
    ): Coin<SHASUI> {
        let amount_shasui_to_mint = compute_amount_shasui_to_mint(self, amount_sui, treasury_shasui);
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
        amount_sui: u64,
        treasury: &mut TreasuryCap<SHASUI>,
    ): u64 {
        let delta_x = amount_sui;
        let x = stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self);
        let y = shasui::total_supply(treasury);

        let r = if (x == 0) {
            delta_x
        } else {
            u64::mul_div(delta_x, y, x)
        };

        event_emit::vec(vector[r, x, y, delta_x]);
        r
    }

    fun compute_amount_sui_to_withdraw(
        self: &StakeProfile,
        coin_shasui: &Coin<SHASUI>,
        treasury: &mut TreasuryCap<SHASUI>,
    ): u64 {
        let delta_y = coin::value(coin_shasui);
        let x = stake_manager::amount_staked_sui(self) + stake_manager::amount_reward_sui(self);
        let y = shasui::total_supply(treasury);

        let r = if (y == 0) {
            delta_y
        } else {
            u64::mul_div(delta_y, x, y)
        };

        event_emit::vec(vector[r, x, y, delta_y]);
        r
    }
}
