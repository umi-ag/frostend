// INFO: Do not use sui::balance in this module
module frostend::actions {
    use sui::clock::Clock;
    use sui::coin::{Self, Coin};
    use sui::tx_context::{TxContext};

    use frostend::bank::{Self, Bank};
    use frostend::pt_amm;
    use frostend::sys_manager;
    use frostend::root::{Self, Root};
    use frostend::token::{CSYCoin, SYCoin, PTCoin, YTCoin};
    use frostend::vault::{Vault};

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
        coin_tag: Coin<X>,
        amount_supply: u64,
        bank: &mut Bank<X>,
        ctx: &mut TxContext,
    ): (Coin<PTCoin<X>>, Coin<YTCoin<X>>) {
        sys_manager::init_vault(issued_at, matures_at, coin_tag, amount_supply, bank, ctx)
    }

    /// LP: 1 #SY*$SY -> 1 #cSY*#cSY
    /// BANK: 1 #cSY*#cSY -> 1 #SY*$SY
    /// TODO: mint cSY
    public fun deposit<X>(
        bank: &mut Bank<X>,
        coin_tag: Coin<X>,
        ctx: &mut TxContext,
    ): Coin<CSYCoin<X>> {
        bank::deposit_tag_to_mint_csy(bank,  coin_tag, ctx)
    }

    /// LP: 1 #cSY*#cSY -> 1 #SY*$SY
    /// BANK: 1 #SY*$SY -> 1 #cSY*#cSY
    public fun withdraw<X>(
        bank: &mut Bank<X>,
        coin_sy: Coin<SYCoin<X>>,
        ctx: &mut TxContext,
    ): Coin<X> {
        bank::burn_sy_to_withdraw_tag(bank, coin_sy, ctx)
    }

    /// PETER: dx #SY -> dy #PT
    /// VAULT: dy #PT -> dx #SY
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    fun swap_sy_to_pt<X>(
        coin_sy: Coin<SYCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<PTCoin<X>> {
        let balance_pt = pt_amm::swap_sy_to_pt(coin::into_balance(coin_sy), vault, clock);
        coin::from_balance(balance_pt, ctx)
    }

    public fun swap_tag_to_pt<X>(
        bank: &mut Bank<X>,
        vault: &mut Vault<X>,
        coin_tag: Coin<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<PTCoin<X>> {
        let coin_sy = bank::deposit_tag_to_mint_sy(bank,  coin_tag, ctx);
        let balance_pt = pt_amm::swap_sy_to_pt(coin::into_balance(coin_sy), vault, clock);
        coin::from_balance(balance_pt, ctx)
    }

    /// PETER: dy #PT -> dx #SY
    /// VAULT: dx #SY -> dy #PT
    /// where curve: x^(1-t) + y^(1-t) = const.
    /// TODO: Improve Curve
    fun swap_pt_to_sy<X>(
        coin_pt: Coin<PTCoin<X>>,
        vault: &mut Vault<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<SYCoin<X>> {
        let balance_sy = pt_amm::swap_pt_to_sy(coin::into_balance(coin_pt), vault, clock);
        coin::from_balance(balance_sy, ctx)
    }

    public fun swap_pt_to_tag<X>(
        bank: &mut Bank<X>,
        vault: &mut Vault<X>,
        coin_pt: Coin<PTCoin<X>>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<X> {
        let balance_sy = pt_amm::swap_pt_to_sy(coin::into_balance(coin_pt), vault, clock);
        let coin_sy = coin::from_balance(balance_sy, ctx);
        bank::burn_sy_to_withdraw_tag(bank, coin_sy, ctx)
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
    fun swap_sy_to_yt<X>(
        coin_sy: Coin<SYCoin<X>>, // -dx_YAN
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<YTCoin<X>> {
        let balance_yt = sys_manager::swap_sy_to_yt(coin::into_balance(coin_sy), vault, bank, clock);
        coin::from_balance(balance_yt, ctx)
    }

    public fun swap_tag_to_yt<X>(
        bank: &mut Bank<X>,
        vault: &mut Vault<X>,
        coin_tag: Coin<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<YTCoin<X>> {
        let coin_sy = bank::deposit_tag_to_mint_sy(bank,  coin_tag, ctx);
        let balance_yt = sys_manager::swap_sy_to_yt(coin::into_balance(coin_sy), vault, bank, clock);
        coin::from_balance(balance_yt, ctx)
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
    fun swap_yt_to_sy<X>(
        coin_yt: Coin<YTCoin<X>>,
        vault: &mut Vault<X>,
        bank: &mut Bank<X>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<SYCoin<X>> {
        let balance_sy = sys_manager::swap_yt_to_sy(coin::into_balance(coin_yt), vault, bank, clock);
        coin::from_balance(balance_sy, ctx)
    }

    public fun swap_yt_to_tag<X>(
        bank: &mut Bank<X>,
        vault: &mut Vault<X>,
        coin_yt: Coin<YTCoin<X>>,
        clock: &Clock,
        ctx: &mut TxContext,
    ): Coin<X> {
        let balance_sy = sys_manager::swap_yt_to_sy(coin::into_balance(coin_yt), vault, bank, clock);
        let coin_sy = coin::from_balance(balance_sy, ctx);
        bank::burn_sy_to_withdraw_tag(bank, coin_sy, ctx)
    }
}

