module frostend::actions {
    use std::debug::print;

    use sui::balance::{Self, Balance};
    use sui::clock::Clock;
    use sui::tx_context::{TxContext};

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};

    fun init(ctx: &mut TxContext) {
    }

    /// LP: 1 #SY*$SY -> 1 #cSY*#cSY
    /// BANK: 1 #cSY*#cSY -> 1 #SY*$SY
    /// TODO: mint cSY
    public(friend) fun deposit<X>(
        balance_sy: Balance<X>,
        bank: &mut Bank<X>,
    ) {
        bank::deposit_sy(balance_sy, bank);
    }

    /// LP: 1 #cSY*#cSY -> 1 #SY*$SY
    /// BANK: 1 #SY*$SY -> 1 #cSY*#cSY
    public(friend) fun withdraw<X>(
        amount: u64,
        bank: &mut Bank<X>,
    ): Balance<X> {
        bank::withdraw_sy(amount, bank)
    }

    /// PETER: dx #SY -> dy #PT
    /// VAULT: dy #PT -> dx #SY
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    public fun swap_sy_to_pt_<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        vault::swap_sy_to_pt(balance_sy, vault, clock)
    }

    /// PETER: dy #PT -> dx #SY
    /// VAULT: dx #SY -> dy #PT
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    public fun swap_pt_to_sy_<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<X> {
        vault::swap_pt_to_sy(balance_pt, vault, clock)
    }


    /// (dx_YAN + dx_BANK) #SY -> (dx_YAN + dx_BANK) #PT + (dx_YAN + dx_BANK) #YT
    /// YAN
    ///     #SY: - dx_YAN
    ///     #YT: +(dx_YAN + dx_BANK)
    /// VAULT:
    ///     #SY: +(dx_YAN + dx_BANK)
    ///     #PT: +(dx_YAN + dx_BANK)
    /// BANK:
    ///     #SY: -(dx_BANK)
    public fun swap_sy_to_yt_<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ): Balance<YTCoin<X>> {
        let amount = balance::value(&balance_sy);
        print(&vector[1345, 1]);
        vault::deposit_sy(balance_sy, vault);
        print(&vector[1345, 2]);
        print(vault);
        bank::borrow_sy(amount, vault, bank);
        print(&vector[1345, 3]);
        vault::mint_pt_and_yt(amount, vault);
        print(&vector[1345, 4]);
        vault::withdraw_yt(amount, vault)
    }

    /// (dx_YAN + dx_BANK) #PT + (dx_YAN + dx_BANK) #YT -> (dx_YAN + dx_BANK) #SY
    /// YAN:
    ///     #SY: + dx_YAN
    ///     #YT: -(dx_YAN + dx_BANK)
    /// VAULT:
    ///     #SY: -(dx_YAN + dx_BANK)
    ///     #PT: -(dx_YAN + dx_BANK)
    /// BANK:
    ///     #SY: +(dx_BANK)
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
