module frostend::bank {
    use std::ascii::String;
    use std::type_name;

    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Balance};
    use sui::tx_context::{TxContext};

    use frostend::coin_utils::merge_coins;
    use frostend::vault::{Self, Vault};

    friend frostend::actions;
    friend frostend::sys_manager;


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
        balance::split(&mut bank.coin_sy_reserve, amount)
    }

    public(friend) fun borrow_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = withdraw_sy(amount, bank);
        vault::deposit_sy(balance_sy, vault);
    }

    public(friend) fun payback_sy<X>(
        amount: u64,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
    ) {
        let balance_sy = vault::withdraw_sy(amount, vault);
        deposit_sy(balance_sy, bank);
    }
}
