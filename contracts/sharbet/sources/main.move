module sharbet::main {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::object::{Self, UID, ID};
    use sui::sui::{SUI};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::clock::{Self, Clock};
    use sui_system::sui_system::{Self, SuiSystemState};
    use sui_system::staking_pool::StakedSui;

    use math::u64;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::cvault::{Self, CVault};

    const ONE_SUI: u64 = 1_000_000_000;


    fun init(ctx: &mut TxContext) {
    }

    public fun stake(
        wrapper: &mut SuiSystemState,
        cvault: &mut CVault,
        shasui_treasury: &mut TreasuryCap<SHASUI>,
        sui_coin: Coin<SUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): Coin<SHASUI> {
        let sui_balance = coin::into_balance(sui_coin);
        let sui_amount = balance::value(&sui_balance);

        let shasui_balance = cvault::mint_shasui(cvault, sui_balance, shasui_treasury, ctx);

        let shasui_coin = coin::from_balance(shasui_balance, ctx);
        shasui_coin
    }

    fun stake_pool(
        wrapper: &mut SuiSystemState,
        cvault: &mut CVault,
        validator_address: address,
        ctx: &mut TxContext,
    ) {
        let amount_pending_sui = cvault::amount_pending_sui(cvault);
        if (amount_pending_sui < ONE_SUI) {
            return
        };

        let balance_pending_sui = cvault::withdraw_pending_sui(cvault, amount_pending_sui);
        let staked_sui = request_add_stake(wrapper, balance_pending_sui, validator_address, ctx);

        cvault::deposit_stakedsui(cvault, staked_sui);
        // validator_set::add_stake(&mut self.validator_set, validator, staked_sui, ctx);
        // add_total_staked_unsafe(self, amount_pending_sui, ctx);
    }

    public fun request_add_stake(
        wrapper: &mut SuiSystemState,
        sui_balance: Balance<SUI>,
        validator_address: address,
        ctx: &mut TxContext,
    ): StakedSui  {
        let sui_coin = coin::from_balance(sui_balance, ctx);
        sui_system::request_add_stake_non_entry(wrapper, sui_coin, validator_address, ctx)
    }
}
