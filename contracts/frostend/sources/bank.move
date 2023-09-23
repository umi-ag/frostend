module frostend::bank {
    use std::ascii::String;
    use std::type_name;

    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{TxContext};

    friend frostend::ctoken;
    friend frostend::sys_manager;

    const E_amount_must_be_less_than_equal_bank_reserve: u64 = 103;

    struct Bank<phantom X> has key, store {
        id: UID,
        coin_sy_reserve: Balance<X>,
    }

    fun init(_ctx: &TxContext) { }

    public fun new<X>(
        ctx: &mut TxContext,
    ): Bank<X> {
        Bank {
            id: object::new(ctx),
            coin_sy_reserve: balance::zero(),
        }
    }

    public fun get_type_name<X>(
    ): String {
        type_name::into_string(type_name::get<Bank<X>>())
    }

    public(friend) fun deposit_sy<X>(
        balance_sy: Balance<X>,
        bank: &mut Bank<X>,
    ) {
        balance::join(&mut bank.coin_sy_reserve, balance_sy);
    }

    public(friend) fun withdraw_sy<X>(
        amount: u64,
        bank: &mut Bank<X>,
    ): Balance<X> {
        assert!(amount <= balance::value(&bank.coin_sy_reserve), E_amount_must_be_less_than_equal_bank_reserve);
        balance::split(&mut bank.coin_sy_reserve, amount)
    }
}
