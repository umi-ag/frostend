module frostend::ctoken {
    use std::debug::print;

    use sui::balance::{Self, Balance};
    use sui::clock::Clock;
    use sui::tx_context::{TxContext};

    use frostend::vault::{Self, Vault, PTCoin, YTCoin};
    use frostend::bank::{Self, Bank};
    use frostend::pt_amm;
    use frostend::sys_manager;

    use math::fixedU32;

    friend frostend::actions;

    fun init(ctx: &mut TxContext) {
    }

    public(friend) fun deposit<X>(
        balance_sy: Balance<X>,
        bank: &mut Bank<X>,
    ) {
        bank::deposit_sy(balance_sy, bank);
    }

    public(friend) fun withdraw<X>(
        amount: u64,
        bank: &mut Bank<X>,
    ): Balance<X> {
        bank::withdraw_sy(amount, bank)
    }
}
