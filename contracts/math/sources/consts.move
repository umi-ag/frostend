module math::consts {
    friend math::u64;
    friend math::u128;

    // 0xFFFFFFFFFFFFFFFF
    public(friend) fun U64_MAX(): u64 { 18446744073709551615 }

    // 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
    public(friend) fun U128_MAX(): u128 { 340282366920938463463374607431768211455 }
}
