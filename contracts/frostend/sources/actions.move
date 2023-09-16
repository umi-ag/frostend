module frostend::actions {
    use sui::balance::{Balance};
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::tx_context::{TxContext};

    use frostend::bank::{Bank};
    use frostend::coin_utils::merge_coins;
    use frostend::ctoken;
    use frostend::pt_amm;
    use frostend::sys_manager;
    use frostend::root::{Self, Root};
    use frostend::vault::{Vault, PTCoin, YTCoin};

    fun init(_ctx: &TxContext) { }

    public fun create_bank<X>(
        root: &mut Root,
        ctx: &mut TxContext,
    ) {
        root::create_bank<X>(root, ctx);
    }

    public fun init_vault<X>(
        issued_at: u64,
        matures_at: u64,
        coins_sy: vector<Coin<X>>,
        amount_supply: u64,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): Coin<YTCoin<X>> {
        let coin_sy = merge_coins(coins_sy, ctx);
        let balance_sy = coin::into_balance(coin_sy);
        let balance_yt = sys_manager::init_vault(issued_at, matures_at, balance_sy, amount_supply, bank, ctx);
        coin::from_balance(balance_yt, ctx)
    }

    /// LP: 1 #SY*$SY -> 1 #cSY*#cSY
    /// BANK: 1 #cSY*#cSY -> 1 #SY*$SY
    /// TODO: mint cSY
    public fun deposit<X>(
        balance_sy: Balance<X>,
        bank: &mut Bank<X>,
    ) {
        ctoken::deposit(balance_sy, bank);
    }

    /// LP: 1 #cSY*#cSY -> 1 #SY*$SY
    /// BANK: 1 #SY*$SY -> 1 #cSY*#cSY
    public fun withdraw<X>(
        amount: u64,
        bank: &mut Bank<X>,
    ): Balance<X> {
        ctoken::withdraw(amount, bank)
    }

    public fun deposit_coins<X>(
        coins_sy: vector<Coin<X>>,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ) {
        let coin_sy = merge_coins(coins_sy, ctx);
        let balance_sy = coin::into_balance(coin_sy);
        deposit(balance_sy, bank);
    }

    /// PETER: dx #SY -> dy #PT
    /// VAULT: dy #PT -> dx #SY
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    public fun convert_sy_to_pt<X>(
        balance_sy: Balance<X>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        pt_amm::swap_sy_to_pt(balance_sy, vault, clock)
    }

    /// PETER: dy #PT -> dx #SY
    /// VAULT: dx #SY -> dy #PT
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    public fun convert_pt_to_sy<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
    ): Balance<X> {
        pt_amm::swap_pt_to_sy(balance_pt, vault, clock)
    }

    /// (dx_YAN + dx_BANK) #SY -> (dx_YAN + dx_BANK) #PT + (dx_YAN + dx_BANK) #YT
    /// YAN
    ///     #SY: -(dx_YAN) ... dx_YAN = -4
    ///     #YT: +(dx_YAN + dx_BANK) ... dy_YAN = +100
    /// VAULT:
    ///     #SY: +(dx_YAN + dx_BANK) ... dx = +100
    ///     #PT: +(dx_YAN + dx_BANK) ... dy = +100
    /// BANK:
    ///     #SY: -(dx_BANK) ... dx_BANK = -96
    /// where
    ///     abs(dy_YAN) = abs(dx_YAN) / $YT
    ///     abs(dx_BANK) = abs(dy_YAN) - abs(dx_YAN)
    ///     abs(dx) = abs(dx_YAN) + abs(dx_BANK)
    /// yan.#SY += -4
    /// yan.#YT += 100
    /// bank.#SY += -96
    /// vault.#SY += 100
    /// vault.#PT += 100
    public fun convert_sy_to_yt<X>(
        balance_sy: Balance<X>, // -dx_YAN
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<YTCoin<X>> {
        sys_manager::swap_sy_to_yt(balance_sy, vault, bank, clock)
    }

    /// (dx_YAN + dx_BANK) #PT + (dx_YAN + dx_BANK) #YT -> (dx_YAN + dx_BANK) #SY
    /// YAN:
    ///     #SY: + dx_YAN
    ///     #YT: -(dx_YAN + dx_BANK)
    /// VAULT:
    ///     #SY: -(dx_YAN + dx_BANK)
    ///     #PT: -(dx_YAN + dx_BANK)
    /// BANK:
    ///     #SY: +(dx_BANK)
    public fun convert_yt_to_sy<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<X> {
        sys_manager::swap_yt_to_sy(balance_yt, vault, bank, clock)
    }

    public fun convert_pt_to_yt<X>(
        balance_pt: Balance<PTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<YTCoin<X>> {
        let balance_sy = convert_pt_to_sy(balance_pt, vault, clock);
        convert_sy_to_yt(balance_sy, vault, bank, clock)
    }

    public fun convert_yt_to_pt<X>(
        balance_yt: Balance<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
    ): Balance<PTCoin<X>> {
        let balance_sy = convert_yt_to_sy(balance_yt, vault, bank, clock);
        convert_sy_to_pt(balance_sy, vault, clock)
    }
}
