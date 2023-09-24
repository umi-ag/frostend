module frostend::token {
    use sui::balance::{Self, Supply};

    struct SYCoin<phantom X> has drop {}
    struct CSYCoin<phantom X> has drop {}
    struct PTCoin<phantom X> has drop {}
    struct YTCoin<phantom X> has drop {}

    friend frostend::bank;
    friend frostend::sys_manager;
    friend frostend::vault;

    public(friend) fun create_supply_sy<X>(): Supply<SYCoin<X>> {
        balance::create_supply<SYCoin<X>>(SYCoin {})
    }

    public(friend) fun create_supply_csy<X>(): Supply<CSYCoin<X>> {
        balance::create_supply<CSYCoin<X>>(CSYCoin {})
    }

    public(friend) fun create_supply_pt<X>(): Supply<PTCoin<X>> {
        balance::create_supply<PTCoin<X>>(PTCoin {})
    }

    public(friend) fun create_supply_yt<X>(): Supply<YTCoin<X>> {
        balance::create_supply<YTCoin<X>>(YTCoin {})
    }
}
