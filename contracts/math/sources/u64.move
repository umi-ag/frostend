module math::u64 {
    use math::consts;
    use math::u128;

    const DIVIDE_BY_ZERO: u64 = 0;
    const OVER_FLOW: u64 = 1;

    public fun max_value(): u64 { consts::U64_MAX() }

    public fun mul_div(a: u64, b: u64, c: u64): u64 {
        let a = (a as u128);
        let b = (b as u128);
        let c = (c as u128);
        let res = u128::mul_div(a, b, c);
        u128::try_into_u64(res)
    }

    public fun powi(base: u64, exp: u8): u64 {
        let result = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = result * base;
            };
            exp = exp >> 1;
            base = base *base;
        };
        result
    }

    #[test_only] use sui::test_utils::{assert_eq};

    #[test]
    fun test_powi() {
        let actual = powi(2, 3);
        let exppcted = 8;
        assert_eq(actual, exppcted);
    }
}
