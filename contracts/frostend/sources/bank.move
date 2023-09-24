module frostend::bank {
    use std::ascii::String;
    use std::type_name;

    use sui::balance::{Self, Balance, Supply};
    use sui::coin::{Self, Coin};
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};

    use math::u64;

    use frostend::token::{Self, CSYCoin, SYCoin};

    #[test_only] use std::debug::print;

    friend frostend::actions;
    friend frostend::sys_manager;

    const E_amount_must_be_less_than_equal_bank_reserve_tag: u64 = 103;
    const E_amount_must_be_less_than_equal_bank_reserve_sy: u64 = 104;

    struct Bank<phantom X> has key, store {
        id: UID,
        reverse_tag: Balance<X>,
        reverse_sy: Balance<SYCoin<X>>,
        supply_sy: Supply<SYCoin<X>>,
        supply_csy: Supply<CSYCoin<X>>,
    }

    // TODO: Meybe make public(friend)
    public fun new<X>(
        ctx: &mut TxContext,
    ): Bank<X> {
        Bank {
            id: object::new(ctx),
            reverse_tag: balance::zero(),
            reverse_sy: balance::zero(),
            supply_sy: token::create_supply_sy<X>(),
            supply_csy: token::create_supply_csy<X>(),
        }
    }

    public fun get_type_name<SYCoin>(
    ): String {
        type_name::into_string(type_name::get<Bank<SYCoin>>())
    }

    fun mint_sy<X>(
        self: &mut Bank<X>,
        amount: u64,
    ): Balance<SYCoin<X>> {
        balance::increase_supply(&mut self.supply_sy, amount)
    }

    fun burn_sy<X>(
        self: &mut Bank<X>,
        balance_sy: Balance<SYCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.supply_sy, balance_sy);
    }

    fun mint_csy<X>(
        self: &mut Bank<X>,
        amount: u64,
    ): Balance<CSYCoin<X>> {
        balance::increase_supply(&mut self.supply_csy, amount)
    }

    fun burn_csy<X>(
        self: &mut Bank<X>,
        balance_pt: Balance<CSYCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.supply_csy, balance_pt);
    }

    // TODO: Meybe make private
    public(friend) fun deposit_sy<X>(
        self: &mut Bank<X>,
        balance_sy: Balance<SYCoin<X>>,
    ) {
        balance::join(&mut self.reverse_sy, balance_sy);
    }

    // TODO: Meybe make private
    public(friend) fun withdraw_sy<X>(
        self: &mut Bank<X>,
        amount: u64,
    ): Balance<SYCoin<X>> {
        assert!(amount <= balance::value(&self.reverse_sy), E_amount_must_be_less_than_equal_bank_reserve_sy);
        balance::split(&mut self.reverse_sy, amount)
    }

    fun deposit_tag<X>(
        self: &mut Bank<X>,
        balance_tag: Balance<X>,
    ): Balance<SYCoin<X>>  {
        let balance_sy = mint_sy(self, balance::value(&balance_tag));
        balance::join(&mut self.reverse_tag, balance_tag);
        balance_sy
    }

    fun withdraw_tag<X>(
        self: &mut Bank<X>,
        balance_sy: Balance<SYCoin<X>>,
    ): Balance<X> {
        let amount = balance::value(&balance_sy);
        assert!(amount <= balance::value(&self.reverse_tag), E_amount_must_be_less_than_equal_bank_reserve_tag);

        burn_sy(self, balance_sy);
        balance::split(&mut self.reverse_tag, amount)
    }

    public(friend) fun deposit_tag_to_mint_sy<X>(
        self: &mut Bank<X>,
        coin_tag: Coin<X>,
        ctx: &mut TxContext
    ): Coin<SYCoin<X>> {
        let balance_sy = deposit_tag(self, coin::into_balance(coin_tag));
        coin::from_balance(balance_sy, ctx)
    }

    public(friend) fun burn_sy_to_withdraw_tag<X>(
        self: &mut Bank<X>,
        coin_sy: Coin<SYCoin<X>>,
        ctx: &mut TxContext,
    ): Coin<X> {
        let balance_tag = withdraw_tag(self, coin::into_balance(coin_sy));
        coin::from_balance(balance_tag, ctx)
    }

    public(friend) fun deposit_tag_to_mint_csy<X>(
        self: &mut Bank<X>,
        coin_tag: Coin<X>,
        ctx: &mut TxContext,
    ): Coin<CSYCoin<X>> {
        let amount_tag = coin::value(&coin_tag);
        let balance_sy = deposit_tag(self, coin::into_balance(coin_tag));
        deposit_sy(self, balance_sy);
        let amount_csy = u64::mul_div(
            amount_tag,
            balance::supply_value(&self.supply_csy),
            balance::supply_value(&self.supply_sy),
        );
        coin::from_balance(mint_csy(self, amount_csy), ctx)
    }

    public(friend) fun burn_csy_to_withdraw_sy<X>(
        self: &mut Bank<X>,
        coin_csy: Coin<CSYCoin<X>>,
        ctx: &mut TxContext,
    ): Coin<X> {
        let amount_tag = u64::mul_div(
            coin::value(&coin_csy),
            balance::supply_value(&self.supply_sy),
            balance::supply_value(&self.supply_csy),
        );
        burn_csy(self, coin::into_balance(coin_csy));
        let balance_sy = withdraw_sy(self, amount_tag);
        let balance_tag = withdraw_tag(self, balance_sy);
        coin::from_balance(balance_tag, ctx)
    }

    #[test_only] use sui::tx_context;
    #[test_only] use sui::transfer;
    #[test_only] use sui::sui::SUI;
    #[test_only] use toolkit::test_utils::{decimals, mint};
    #[test_only] use sui::test_utils::{assert_eq, destroy};

    #[test]
    fun test_A105_deposit(){
        let ctx = &mut tx_context::dummy();
        let bank = new<SUI>(ctx);
        let coin = deposit_tag_to_mint_csy(
            &mut bank,
            mint<SUI>(1234, 9, ctx),
            ctx,
        );
        assert_eq(
            balance::value(&bank.reverse_sy),
            decimals(1234, 9)
        );
        destroy(coin);
        destroy(bank);
    }
}
