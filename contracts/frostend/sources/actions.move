module frostend::actions {
    use sui::balance::{Self, Balance};

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};
    use sui::tx_context::{TxContext};

    fun init(ctx: &mut TxContext) {

    }

    public fun swap_sy_to_pt_<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<PTCoin<X>> {
        use std::debug::print;
        print(&balance_sy);
        let amount = balance::value(&balance_sy);
        print(vault);
        vault::deposit_sy(balance_sy, vault);
        print(&vector[1004, 1]);
        print(vault);
        bank::payback_sy(amount, vault, bank);
        vault::withdraw_pt(amount, vault)
    }

    public fun swap_pt_to_sy_<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<X> {
        let amount = balance::value(&balance_pt);
        vault::deposit_pt(balance_pt, vault);
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
