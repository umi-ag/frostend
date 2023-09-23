module math::u64 {
    use math::u128;

    const DIVIDE_BY_ZERO: u64 = 0;
    const OVER_FLOW: u64 = 1;

    // 0xFFFFFFFFFFFFFFFF
    public fun max_value(): u64 { 18446744073709551615 }

    public fun mul_div(a: u64, b: u64, c: u64): u64 {
        let a = (a as u128);
        let b = (b as u128);
        let c = (c as u128);
        let res = u128::mul_div(a, b, c);
        u128::try_into_u64(res)
    }
}
