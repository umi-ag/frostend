module frostend::token {
    use sui::balance::{Self, Supply};

    struct PTCoin<phantom X> has drop {}
    struct YTCoin<phantom X> has drop {}

    friend frostend::vault;
    friend frostend::sys_manager;

    public(friend) fun create_supply_pt<X>(): Supply<PTCoin<X>> {
        balance::create_supply<PTCoin<X>>(PTCoin {})
    }

    public(friend) fun create_supply_yt<X>(): Supply<YTCoin<X>> {
        balance::create_supply<YTCoin<X>>(YTCoin {})
    }
}
