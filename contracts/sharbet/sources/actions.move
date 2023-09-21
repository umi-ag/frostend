#[allow(unused_field)]
module sharbet::actions {
    use sui::coin::{Coin, TreasuryCap};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{SuiSystemState};

    use sharbet::shasui::{SHASUI};
    use sharbet::sha_manager::{Self};
    use sharbet::stake_manager::{StakeProfile};
    use sharbet::unstake_ticket::{UnstakeTicket, UnstSuiTreasuryCap};


    /// SUI -> shaSUI
    public fun stake_sui_to_mint_shasui(
        stake_profile: &mut StakeProfile,
        coin_sui: Coin<SUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        sha_manager::stake_sui_to_mint_shasui(stake_profile, coin_sui, wrapper, treasury_shasui, validator_address, ctx)
    }

    /// shaSUI -> unstSUI
    public fun burn_shasui_to_mint_unstsui(
        stake_profile: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        treasury_unstsui: &mut UnstSuiTreasuryCap,
        ctx: &mut TxContext,
    ): UnstakeTicket {
        sha_manager::burn_shasui_to_mint_unstsui(stake_profile, coin_shasui, treasury_shasui, treasury_unstsui, ctx)
    }

    /// unstSUI -> SUI
    public fun burn_unstsui_to_unstake_sui(
        stake_profile: &mut StakeProfile,
        unstsui: UnstakeTicket,
        wrapper: &mut SuiSystemState,
        treasury_unstsui: &mut UnstSuiTreasuryCap,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        sha_manager::burn_unstsui_to_unstake_sui(stake_profile, unstsui, wrapper, treasury_unstsui, ctx)
    }
}
