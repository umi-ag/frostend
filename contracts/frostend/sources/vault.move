module frostend::vault {
    use std::ascii::String;
    use std::debug::print;
    use std::type_name;

    use sui::clock::{Self, Clock};
    use sui::object::{Self, UID};
    use sui::balance::{Self, Supply, Balance};
    use sui::tx_context::{TxContext};


    use math::fixed_point64::{FixedPoint64};
    use math::fixedU64;

    use frostend::token::{Self, SYCoin, PTCoin, YTCoin};

    friend frostend::pt_amm;
    friend frostend::sys_manager;


    struct Vault<phantom X> has key, store {
        id: UID,
        reserve_sy: Balance<SYCoin<X>>,
        reserve_pt: Balance<PTCoin<X>>,
        reserve_yt: Balance<YTCoin<X>>,
        supply_pt: Supply<PTCoin<X>>,
        supply_yt: Supply<YTCoin<X>>,
        issued_at: u64,
        matures_at: u64,
    }

    public fun new<X>(
        issued_at: u64,
        matures_at: u64,
        ctx: &mut TxContext,
    ): Vault<X> {
        Vault {
            id: object::new(ctx),
            reserve_sy: balance::zero(),
            reserve_pt: balance::zero(),
            reserve_yt: balance::zero(),
            supply_pt: token::create_supply_pt<X>(),
            supply_yt: token::create_supply_yt<X>(),
            issued_at,
            matures_at,
        }
    }

    public fun get_type_name<X>(
    ): String {
        type_name::into_string(type_name::get<Vault<X>>())
    }

    public fun reserve_sy<X>(
        self: &Vault<X>,
    ): u64 {
        balance::value(&self.reserve_sy)
    }

    public fun reserve_pt<X>(
        self: &Vault<X>,
    ): u64 {
        balance::value(&self.reserve_pt)
    }

    /// constrains 0 <= t <= 1
    public fun get_time_to_maturity<X>(
        self: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let current_time = clock::timestamp_ms(clock);

        if (current_time < self.issued_at) {
            fixedU64::from_u64(1)
        } else if (current_time > self.matures_at) {
            fixedU64::from_u64(0)
        } else {
            fixedU64::div(
                fixedU64::from_u64(current_time - self.issued_at),
                fixedU64::from_u64(self.matures_at - self.issued_at)
            )
        }
    }

    public(friend) fun deposit_sy<X>(
        self: &mut Vault<X>,
        balance_sy: Balance<SYCoin<X>>,
    ) {
        balance::join(&mut self.reserve_sy, balance_sy);
    }

    public(friend) fun deposit_pt<X>(
        self: &mut Vault<X>,
        balance_pt: Balance<PTCoin<X>>,
    ) {
        balance::join(&mut self.reserve_pt, balance_pt);
    }

    public(friend) fun deposit_yt<X>(
        self: &mut Vault<X>,
        balance_yt: Balance<YTCoin<X>>,
    ) {
        balance::join(&mut self.reserve_yt, balance_yt);
    }

    public(friend) fun withdraw_sy<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<SYCoin<X>> {
        balance::split(&mut self.reserve_sy, amount)
    }

    public(friend) fun withdraw_pt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<PTCoin<X>> {
        balance::split(&mut self.reserve_pt, amount)
    }

    public(friend) fun withdraw_yt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<YTCoin<X>> {
        balance::split(&mut self.reserve_yt, amount)
    }

    fun mint_pt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<PTCoin<X>> {
        balance::increase_supply(&mut self.supply_pt, amount)
    }

    fun burn_pt<X>(
        self: &mut Vault<X>,
        balance_pt: Balance<PTCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.supply_pt, balance_pt);
    }

    fun mint_yt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<YTCoin<X>> {
        balance::increase_supply(&mut self.supply_yt, amount)
    }

    fun burn_yt<X>(
        self: &mut Vault<X>,
        balance_yt: Balance<YTCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.supply_yt, balance_yt);
    }

    public(friend) fun mint_pt_and_yt<X>(
        self: &mut Vault<X>,
        balance_sy: Balance<SYCoin<X>>,
    ): (Balance<PTCoin<X>>, Balance<YTCoin<X>>) {
        let amount = balance::value(&balance_sy);
        deposit_sy(self, balance_sy);
        let balance_pt = mint_pt(self, amount);
        let balance_yt = mint_yt(self, amount);

        (balance_pt, balance_yt)
    }

    public(friend) fun burn_pt_and_yt<X>(
        self: &mut Vault<X>,
        balance_pt: Balance<PTCoin<X>>,
        balance_yt: Balance<YTCoin<X>>,
    ): Balance<SYCoin<X>> {
        let amount = balance::value(&balance_pt);

        // TODO: Uncomment this
        // assert(balance::value(&balance_yt) == amount);

        burn_pt(self, balance_pt);
        burn_yt(self, balance_yt);
        withdraw_sy(self, amount)
    }

    public fun all_is_zero<X>(
        self: &Vault<X>,
    ): bool {
        balance::value(&self.reserve_sy) == 0
        && balance::value(&self.reserve_pt) == 0
        && balance::value(&self.reserve_yt) == 0
        && balance::supply_value(&self.supply_pt) == 0
        && balance::supply_value(&self.supply_yt) == 0
    }

    #[test_only] use sui::test_utils::{assert_eq, destroy};


    #[test_only]
    public fun assert_eq_reserve_sy<X>(self: &Vault<X>, expected: u64) {
        assert_eq(balance::value(&self.reserve_sy), expected);
    }

    #[test_only]
    public fun assert_eq_reserve_pt<X>(self: &Vault<X>, expected: u64) {
        assert_eq(balance::value(&self.reserve_pt), expected);
    }

    #[test_only]
    public fun assert_eq_reserve_yt<X>(self: &Vault<X>, expected: u64) {
        assert_eq(balance::value(&self.reserve_yt), expected);
    }

    #[test_only]
    public fun assert_eq_supply_pt<X>(self: &Vault<X>, expected: u64) {
        assert_eq(balance::supply_value(&self.supply_pt), expected);
    }

    #[test_only]
    public fun assert_eq_supply_yt<X>(self: &Vault<X>, expected: u64) {
        assert_eq(balance::supply_value(&self.supply_yt), expected);
    }
}
