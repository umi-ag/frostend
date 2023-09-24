module frostend::ctoken {
    use sui::balance::{Balance};
    use sui::tx_context::{TxContext};

    use frostend::token::{SYCoin};

    use frostend::bank::{Self, Bank};

    friend frostend::actions;

    fun init(_ctx: &TxContext) { }

    public(friend) fun deposit<X>(
        balance_sy: Balance<SYCoin<X>>,
        bank: &mut Bank<X>,
    ) {
        bank::deposit_sy(bank, balance_sy);
    }

    public(friend) fun withdraw<X>(
        amount: u64,
        bank: &mut Bank<X>,
    ): Balance<SYCoin<X>> {
        bank::withdraw_sy(bank, amount)
    }
}
