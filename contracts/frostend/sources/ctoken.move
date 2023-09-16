module frostend::ctoken {
    use sui::balance::{Balance};
    use sui::tx_context::{TxContext};

    use frostend::bank::{Self, Bank};

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
