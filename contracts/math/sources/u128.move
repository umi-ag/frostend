module math::u128 {
    use math::consts;

    const DIVIDE_BY_ZERO: u64 = 1002;
    const CALCULATION_OVERFLOW: u64 = 1003;

    public fun max_value(): u128 { consts::U128_MAX() }

    public fun try_into_u64(x: u128): u64 {
        assert!(x <= (consts::U64_MAX() as u128), CALCULATION_OVERFLOW);
        (x as u64)
    }

    /// Return the value of a * b / c
    public fun mul_div(a: u128, b: u128, c: u128): u128 {
        let (a , b) = if (a >= b) {
            (a, b)
        } else {
            (b, a)
        };

        assert!(c > 0, DIVIDE_BY_ZERO);

        if (!is_safe_mul(a, b)) {
            // formula: ((a / c) * b) + (((a % c) * b) / c)
            checked_mul((a / c), b) + (checked_mul((a % c), b) / c)
        } else {
            a * b / c
        }
    }

    /// Return value of x * y with checking the overflow
    public fun checked_mul(x: u128, y: u128): u128 {
        assert!(is_safe_mul(x, y), CALCULATION_OVERFLOW);
        x * y
    }

    /// Check whether x * y doesn't lead to overflow
    public fun is_safe_mul(x: u128, y: u128): bool {
        (max_value() / x >= y)
    }


    #[test]
    fun mul_div_test() {
        // normal calculation a * b / c
        assert!(mul_div(100, 3, 13) == 100 * 3 / 13, 1);

        // undirect calculation
        // here a * b directly will cause u128 overflow, so we are testing whether the function handle it gracefully
        let a: u256 = 12371283712891321589152198391829;
        let b: u256 = 27505826;
        let c: u256 = 13;
        assert!(mul_div((a as u128), (b as u128), (c as u128)) == ((a * b / c) as u128), 1);
    }

    #[test, expected_failure(abort_code = CALCULATION_OVERFLOW)]
    fun mul_div_overflow_test() {
        mul_div(max_value(), max_value(), 1);
    }

    #[test, expected_failure(abort_code = DIVIDE_BY_ZERO)]
    fun mul_div_divide_by_zero_test() {
        mul_div(100, 3, 0);
    }
}
