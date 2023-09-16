module frostend::sys_manager {
    use std::debug::print;
    use std::fixed_point32::{Self, FixedPoint32};

    use sui::balance::{Self, Balance};
    use sui::clock::{Self, Clock};
    use sui::tx_context::{TxContext};

    use math::fixedU32;

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};
    use frostend::pt_amm;

    friend frostend::actions;

    fun init(ctx: &mut TxContext) {
    }

    public(friend) fun swap_sy_to_yt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<YTCoin<X>> {
        let price_yt = pt_amm::get_price_yt_to_sy(vault, clock);
        let dx_YAN = fixedU32::from_u64(balance::value(&balance_sy));
        let dy_YAN = fixedU32::div(dx_YAN, price_yt);
        let dx_BANK = fixedU32::sub(dy_YAN, dx_YAN);

        let amount_sy_bank = fixedU32::floor(dx_BANK);
        let balance_sy_bank = bank::withdraw_sy(amount_sy_bank, bank); // 96
        balance::join(&mut balance_sy, balance_sy_bank); // 100
        let (balance_pt, balance_yt) = vault::mint_pt_and_yt(balance_sy, vault);
        vault::deposit_pt(balance_pt, vault);

        balance_yt
    }
}
