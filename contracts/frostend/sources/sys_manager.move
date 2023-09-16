module frostend::sys_manager {
    use sui::balance::{Self, Balance};
    use sui::clock::{Clock};
    use sui::tx_context::{TxContext};
    use sui::transfer;

    use math::fixedU32;

    use frostend::vault::{Self, Vault, YTCoin};
    use frostend::bank::{Self, Bank};
    use frostend::pt_amm;

    friend frostend::actions;

    fun init(_ctx: &TxContext) { }

    public(friend) fun init_vault<X>(
        issued_at: u64,
        matures_at: u64,
        balance_sy: Balance<X>,
        amount_supply: u64,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): Balance<YTCoin<X>> {
        let vault = vault::new<X>(issued_at, matures_at, ctx);

        let amount_sy_to_borrow_from_bank = amount_supply - balance::value(&balance_sy);
        let balance_sy_bank = bank::withdraw_sy(amount_sy_to_borrow_from_bank, bank);
        balance::join(&mut balance_sy, balance_sy_bank);
        let (balance_pt, balance_yt) = vault::mint_pt_and_yt(balance_sy, &mut vault);
        vault::deposit_pt(balance_pt, &mut vault);

        transfer::public_share_object(vault);

        balance_yt
    }

    /// yan.#SY += -4
    /// yan.#YT += 100
    /// bank.#SY += -96
    /// vault.#SY += 100
    /// vault.#PT += 100
    public(friend) fun swap_sy_to_yt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<YTCoin<X>> {
        let price_yt = pt_amm::get_price_yt_to_sy(vault, clock); // 4
        let delta_supply = fixedU32::floor(
            fixedU32::div(
                fixedU32::from_u64(balance::value(&balance_sy)), // 4
                price_yt, // 0.04
            )
        ); // 100

        let amount_sy_to_borrow_from_bank = delta_supply - balance::value(&balance_sy); // 96
        let balance_sy_bank = bank::withdraw_sy(amount_sy_to_borrow_from_bank, bank);
        balance::join(&mut balance_sy, balance_sy_bank); // 100
        let (balance_pt, balance_yt) = vault::mint_pt_and_yt(balance_sy, vault);
        vault::deposit_pt(balance_pt, vault);

        balance_yt
    }

    /// yan.#SY += 4
    /// yan.#YT += -100
    /// bank.#SY += 96
    /// vault.#SY += -100
    /// vault.#PT += -100
    public(friend) fun swap_yt_to_sy<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<X> {
        let delta_supply = balance::value(&balance_yt); // 100
        let balance_pt = vault::withdraw_pt(delta_supply, vault);
        let balance_sy = vault::burn_pt_and_yt(balance_pt, balance_yt, vault);

        let price_pt = pt_amm::get_price_pt_to_sy(vault, clock);

        let amount_to_yan = fixedU32::floor(
            fixedU32::mul(
                fixedU32::from_u64(delta_supply),
                price_pt,
            )
        );
        let balance_sy_to_repay_for_bank = balance::split(&mut balance_sy, amount_to_yan);
        bank::deposit_sy(balance_sy_to_repay_for_bank, bank);

        balance_sy
    }
}
