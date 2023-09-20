#[allow(unused_field)]
module sharbet::actions {
    use sui::coin::{Coin, TreasuryCap};
    use sui::sui::{SUI};
    use sui::tx_context::{TxContext};
    use sui_system::sui_system::{SuiSystemState};

    use sharbet::shasui::{SHASUI};
    use sharbet::sha_manager::{Self};
    use sharbet::stake_manager::{StakeProfile};

    fun init(_ctx: &TxContext) { }

    public fun stake_sui_to_mint_shasui(
        wrapper: &mut SuiSystemState,
        validator_address: address,
        stake_profile: &mut StakeProfile,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        coin_sui: Coin<SUI>,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        sha_manager::stake_sui_to_mint_shasui(stake_profile, coin_sui, wrapper, treasury_shasui, validator_address, ctx)
    }

    public fun unstake_sui_to_burn_shasui(
        stake_profile: &mut StakeProfile,
        coin_shasui: Coin<SHASUI>,
        wrapper: &mut SuiSystemState,
        treasury_shasui: &mut TreasuryCap<SHASUI>,
        ctx: &mut TxContext,
    ): Coin<SUI> {
        sha_manager::unstake_sui_to_burn_shasui(stake_profile, coin_shasui, wrapper, treasury_shasui, ctx)
    }
}
