module frostend::vault {
    use std::ascii::String;
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
        coin_sy_reserve: Balance<SYCoin<X>>,
        coin_pt_reserve: Balance<PTCoin<X>>,
        coin_yt_reserve: Balance<YTCoin<X>>,
        coin_pt_supply: Supply<PTCoin<X>>,
        coin_yt_supply: Supply<YTCoin<X>>,
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
            coin_sy_reserve: balance::zero(),
            coin_pt_reserve: balance::zero(),
            coin_yt_reserve: balance::zero(),
            coin_pt_supply: token::create_supply_pt<X>(),
            coin_yt_supply: token::create_supply_yt<X>(),
            issued_at,
            matures_at,
        }
    }

    public fun get_type_name<X>(
    ): String {
        type_name::into_string(type_name::get<Vault<X>>())
    }

    public fun coin_sy_reserve<X>(
        vault: &Vault<X>,
    ): u64 {
        balance::value(&vault.coin_sy_reserve)
    }

    public fun coin_pt_reserve<X>(
        vault: &Vault<X>,
    ): u64 {
        balance::value(&vault.coin_pt_reserve)
    }

    /// constrains 0 <= t <= 1
    public fun get_time_to_maturity<X>(
        vault: &Vault<X>,
        clock: &Clock,
    ): FixedPoint64 {
        let current_time = clock::timestamp_ms(clock);

        if (current_time < vault.issued_at) {
            fixedU64::from_u64(1)
        } else if (current_time > vault.matures_at) {
            fixedU64::from_u64(0)
        } else {
            fixedU64::div(
                fixedU64::from_u64(current_time - vault.issued_at),
                fixedU64::from_u64(vault.matures_at - vault.issued_at)
            )
        }
    }

    public(friend) fun deposit_sy<X>(
        self: &mut Vault<X>,
        balance_sy: Balance<SYCoin<X>>,
    ) {
        balance::join(&mut self.coin_sy_reserve, balance_sy);
    }

    public(friend) fun deposit_pt<X>(
        self: &mut Vault<X>,
        balance_pt: Balance<PTCoin<X>>,
    ) {
        balance::join(&mut self.coin_pt_reserve, balance_pt);
    }

    public(friend) fun deposit_yt<X>(
        self: &mut Vault<X>,
        balance_yt: Balance<YTCoin<X>>,
    ) {
        balance::join(&mut self.coin_yt_reserve, balance_yt);
    }

    public(friend) fun withdraw_sy<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<SYCoin<X>> {
        balance::split(&mut self.coin_sy_reserve, amount)
    }

    public(friend) fun withdraw_pt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<PTCoin<X>> {
        balance::split(&mut self.coin_pt_reserve, amount)
    }

    public(friend) fun withdraw_yt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<YTCoin<X>> {
        balance::split(&mut self.coin_yt_reserve, amount)
    }

    fun mint_pt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<PTCoin<X>> {
        balance::increase_supply(&mut self.coin_pt_supply, amount)
    }

    fun burn_pt<X>(
        self: &mut Vault<X>,
        balance_pt: Balance<PTCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.coin_pt_supply, balance_pt);
    }

    fun mint_yt<X>(
        self: &mut Vault<X>,
        amount: u64,
    ): Balance<YTCoin<X>> {
        balance::increase_supply(&mut self.coin_yt_supply, amount)
    }

    fun burn_yt<X>(
        self: &mut Vault<X>,
        balance_yt: Balance<YTCoin<X>>,
    ) {
        balance::decrease_supply(&mut self.coin_yt_supply, balance_yt);
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
        vault: &Vault<X>,
    ): bool {
        balance::value(&vault.coin_sy_reserve) == 0
        && balance::value(&vault.coin_pt_reserve) == 0
        && balance::value(&vault.coin_yt_reserve) == 0
        && balance::supply_value(&vault.coin_pt_supply) == 0
        && balance::supply_value(&vault.coin_yt_supply) == 0
    }
}
