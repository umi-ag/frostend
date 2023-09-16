module frostend::ctoken {
    use std::debug::print;

    use sui::balance::{Balance};
    use sui::clock::Clock;
    use sui::tx_context::{TxContext};

    use frostend::bank::{Self, Bank};

    use math::fixedU32;

    friend frostend::actions;

    fun init(_ctx: &TxContext) { }

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
