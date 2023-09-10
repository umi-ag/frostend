module frostend::bank {
    use sui::object::{Self, UID, ID};
    use sui::balance::{Self, Supply, Balance};
    use sui::tx_context::{Self, TxContext};

    use frostend::vault::{Self, Vault};

    friend frostend::actions;

    struct Bank<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
    }

    fun init(ctx: &mut TxContext) {

    }

    public fun new<X>(
        ctx: &mut TxContext,
    ): Bank<X> {
        Bank {
            id: object::new(ctx),
            coin_sy_reserve: balance::zero(),
        }
    }

    public(friend) fun borrow_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = balance::split(&mut bank.coin_sy_reserve, amount);
        vault::deposit_sy(balance_sy, vault);
    }

    public(friend) fun payback_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = vault::withdraw_sy(amount, vault);
        balance::join(&mut bank.coin_sy_reserve, balance_sy);
    }
}
