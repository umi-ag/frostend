module frostend::actions {
    use std::debug::print;

    use sui::balance::{Self, Balance};
    use sui::tx_context::{TxContext};

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};

    fun init(ctx: &mut TxContext) {

    }

    public fun swap_sy_to_pt_<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<PTCoin<X>> {
        let amount = balance::value(&balance_sy);
        vault::deposit_sy(balance_sy, vault);
        bank::payback_sy(amount, vault, bank);
        {
            // TODO: Remove this
            vault::mint_pt(amount, vault);
        };
        vault::withdraw_pt(amount, vault)
    }

    public fun swap_pt_to_sy_<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_pt);
        vault::deposit_pt(balance_pt, vault);
        {
            // TODO: Remove this
            vault::burn_pt(amount, vault);
        };
        bank::borrow_sy(amount, vault, bank);
        vault::withdraw_sy(amount, vault)
    }

    public fun swap_sy_to_yt_<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<YTCoin<X>> {
        let amount = balance::value(&balance_sy);
        vault::deposit_sy(balance_sy, vault);
        bank::borrow_sy(amount, vault, bank);
        vault::mint_pt_and_yt(amount, vault);
        vault::withdraw_yt(amount, vault)
    }

    public fun swap_yt_to_sy_<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_yt);
        vault::deposit_yt(balance_yt, vault);
        vault::burn_pt_and_yt(amount, vault);
        bank::payback_sy(amount, vault, bank);
        vault::withdraw_sy(amount, vault)
    }

    public fun swap_pt_to_yt_<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<YTCoin<X>> {
        let amount = balance::value(&balance_pt);
        vault::deposit_pt(balance_pt, vault);
        bank::borrow_sy(amount, vault, bank);
        vault::mint_pt_and_yt(amount, vault);
        vault::withdraw_yt(amount, vault)
    }

    public fun swap_yt_to_pt_<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<PTCoin<X>> {
        let amount = balance::value(&balance_yt);
        vault::deposit_yt(balance_yt, vault);
        vault::burn_pt_and_yt(amount, vault);
        bank::payback_sy(amount, vault, bank);
        vault::withdraw_pt(amount, vault)
    }
}
