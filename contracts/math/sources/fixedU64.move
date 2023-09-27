/***
This is the helper module for std::fixed_point64
*/
module math::fixedU64 {
    use math::fixed_point64::{Self, FixedPoint64, floor, round};
    use math::u128;
    use math::u64;

    /// When exponent is too large
    const ERR_EXPONENT_TOO_LARGE: u64 = 0;

    const ONE_RAW: u128 = 1 << 64;
    const TWO_RAW: u128 = 1 << 65;
    const TWO_POW_2_RAW: u128 = 1 << 66;
    const TWO_POW_3_RAW: u128 = 1 << 67;
    const TWO_POW_4_RAW: u128 = 1 << 68;
    const TWO_POW_5_RAW: u128 = 1 << 69;
    const TWO_POW_6_RAW: u128 = 1 << 70;
    const TWO_POW_NEG_1_RAW: u128 = 1 << 63;
    const TWO_POW_NEG_2_RAW: u128 = 1 << 62;
    const TWO_POW_NEG_3_RAW: u128 = 1 << 61;
    const TWO_POW_NEG_4_RAW: u128 = 1 << 60;

    const EXP_1_RAW: u128 = 50143449209799256676;
    const EXP_2_RAW: u128 = 136304026803256390374;
    const EXP_4_RAW: u128 = 1007158100559408450779;
    const EXP_8_RAW: u128 = 54988969081439155349854;
    const EXP_16_RAW: u128 = 163919806582506698216928336;
    const EXP_32_RAW: u128 = 1456609517792428400051253459476158;
    const EXP_1_OVER_2_RAW: u128 = 30413539329486470297;
    const EXP_1_OVER_4_RAW: u128 = 23686088245777032821;
    const EXP_1_OVER_8_RAW: u128 = 20902899511243624352;
    const EXP_1_OVER_16_RAW: u128 = 19636456851539679197;

    const LOG_2_E_INV_RAW: u128 = 12786308645977587712; // 1.0 / log_2(e)

    const ONE_PLUS_TEN_EXP_MINUS_9: u128 = 18446744092156295689; // fixed_point64::fraction(1000000001, 1000000000)
    const ONE_MINUS_TEN_EXP_MINUS_9: u128 = 18446744055262807542; // fixed_point64::fraction(999999999, 1000000000)


    const E_devided_by_zero: u64 = 103;
    const E_calculation_overflow: u64 = 104;
    const E_divisor_result_too_small: u64 = 105;
    const E_divide_result_too_large: u64 = 106;

    /// 2^64 == 1 << 64
    const TWO_POW_64: u128 = 1 << 64;

    /// 2^32 == 1 << 32
    const TWO_POW_32: u128 = 1 << 32;

    const PRECISION: u8 = 64; // number of bits in the mantissa


    // 3.14159265358979323846264338327950288f64
    public fun PI(): FixedPoint64 {
        fixed_point64::create_from_rational(
            314_159_265_358_979_323_846_264_338_327_950_288,

            100_000_000_000_000_000_000_000_000_000_000_000,
        )
        // 314_159_265_358_979_323_846_264_338_327_950_288,
        // 010_000_000_000_000_000_000_000_000_000_000_000,
    }

    // Euler_s number (e)
    // 2.71828182845904523536028747135266250f64;
    public fun E(): FixedPoint64 {
        fixed_point64::create_from_rational(
            271_828_182_845_904_523_536_028_747_135_266_250,
            100_000_000_000_000_000_000_000_000_000_000_000,
        )
    }

    // A FixedPoint64 represnets 0
    public fun zero(): FixedPoint64 {
        fixed_point64::create_from_rational(0, 1)
    }

    public fun from_u64(val: u64): FixedPoint64 {
        fixed_point64::create_from_rational((val as u128), 1)
    }

    // Greater than
    public fun gt(a: FixedPoint64, b: FixedPoint64): bool {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        return a_raw > b_raw
    }

    // greater than equal
    public fun gte(a: FixedPoint64, b: FixedPoint64): bool {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        return a_raw >= b_raw
    }

    // Less than
    public fun lt(a: FixedPoint64, b: FixedPoint64): bool {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        return a_raw < b_raw
    }

    public fun precision(num: FixedPoint64, digits: u8): FixedPoint64 {
        let multiplier = from_u64(u64::powi(10, digits));
        let x = round(mul(num, multiplier));

        div(
            fixed_point64::create_from_u128(x),
            multiplier
        )
    }

    // Add 2 FixedPoint64 numers
    public fun add(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        fixed_point64::create_from_raw_value(a_raw + b_raw)
    }

    // Substract 2 FixedPoint64 numers
    public fun sub(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        fixed_point64::create_from_raw_value(a_raw - b_raw)
    }

    // Multiple 2 FixedPoint64 numers
    public fun mul(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        let unscaled_res = (a_raw as u256) * (b_raw as u256);
        std::debug::print(&vector[8888999998888, 2]);
        std::debug::print(&unscaled_res);
        let scaled_res = (unscaled_res >> 128 as u128);
        fixed_point64::create_from_raw_value(scaled_res)
    }

    // Divide 2 FixedPoint64 numers
    public fun div(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        fixed_point64::create_from_rational(a_raw, b_raw)
    }

    // a * b / c
    public fun mul_div(a: FixedPoint64, b: FixedPoint64, c: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        let c_raw = fixed_point64::get_raw_value(c);

        let result = u128::mul_div(a_raw, b_raw, c_raw);
        fixed_point64::create_from_raw_value(result)
    }

    // Power function for FixedPoint64 numbers
    public fun powi(base: FixedPoint64, exponent: u64): FixedPoint64 {
        let result = from_u64(1);
        let current_exponent = exponent;
        let current_base = base;

        while (current_exponent > 0) {
            if (current_exponent % 2 == 1) {
            result = mul(result, current_base);
            };
            current_base = mul(current_base, current_base);
            current_exponent = current_exponent / 2;
        };
        result
    }

    // code reference: https://github.com/dmoulding/log2fix/blob/master/log2fix.c
    // algorithm: http://www.claysturner.com/dsp/BinaryLogarithm.pdf
    public fun log2(x: FixedPoint64): (u8, FixedPoint64) {
        let z = fixed_point64::get_raw_value(x);
        let y: u128 = 0;
        let y_negative: u128 = 0;
        let b: u128 = 1 << (PRECISION - 1);
        let i: u8 = 0;
        let sign: u8 = 1;

        // normalize input to the range [1,2)
        while (z >= TWO_RAW) {
            z = z >> 1;
            y = y + ONE_RAW;
        };

        while (z < ONE_RAW) {
            sign = 0;
            z = z << 1;
            y_negative = y_negative + ONE_RAW;
        };

        while (i < 62) {
            // to calculate (z*z) >> 64, use the fact that z is in the range [1,2)
            // (z >> 1) can fill in lower 64 bits of u128
            // therefore, (z >> 1) * (z >> 1) will not overflow
            z = ((z >> 1) * (z >> 1)) >> 62;
            if (z >= TWO_RAW) {
                z = z >> 1;
                y = y + b;
            };
            b = b >> 1;
            i = i + 1;
        };

        let result = if (sign > 0) { fixed_point64::create_from_u128(y) } else { fixed_point64::create_from_u128(y_negative - y) };

        (sign, result)
    }

    public fun ln(x: FixedPoint64): (u8, FixedPoint64) {
        // ln(x) = log_2(x) / log_2(e)
        let (sign, result) = log2(x);
        result = mul(result, fixed_point64::create_from_u128(LOG_2_E_INV_RAW));
        (sign, result)
    }

    public fun exp(sign: u8, x: FixedPoint64): FixedPoint64 {
        // assert!(fixed_point64::get_raw_value(x) < TWO_POW_6_RAW, ERR_EXPONENT_TOO_LARGE);
        let result;
        if (fixed_point64::get_raw_value(x) == 0) {
            result = from_u64(1)
        } else if (sign == 0) {
            result = div(from_u64(1), exp(1, x));
        } else if (fixed_point64::get_raw_value(x) == ONE_RAW) {
            result = fixed_point64::create_from_u128(EXP_1_RAW);
        } else {
            result = from_u64(1);

            let term = from_u64(1);
            let factorial = from_u64(1);
            let n = from_u64(1);

            let iteration_limit = from_u64(10); // Iterate 10 times for approximation
            while (lt(n, iteration_limit)) {
                term = mul(term, x);
                factorial = mul(factorial, n);
                result = add(result, div(term, factorial));
                n = add(n, from_u64(1));
            };
        };

        result
    }

    public fun powf(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (success, result) = try_simple_pow(x, y);
        if (success) {
            result
        } else {
            pow_internal(x, y)
        }
    }

    /// pow_up multiplies pow result by (1 + 10^-9) if numerical approximation is used in pow
    /// based on experiments, the result is always greater than or equal to the true value
    public fun pow_up(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (success, result) = try_simple_pow(x, y);
        if (success) {
            result
        } else {
            mul(pow_internal(x, y), fixed_point64::create_from_u128(ONE_PLUS_TEN_EXP_MINUS_9))
        }
    }

    /// pow_down multiplies pow result by (1 - 10^-9) if numerical approximation is used in pow
    /// based on experiments, the result is always smaller than or equal to the true value
    public fun pow_down(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (success, result) = try_simple_pow(x, y);
        if (success) {
            result
        } else {
            mul(pow_internal(x, y), fixed_point64::create_from_u128(ONE_MINUS_TEN_EXP_MINUS_9))
        }
    }

    /// try_simple_pow returns the result of pow if it can be computed using simple rules
    /// e.g. x^0 = 1, x^1 = x, x^2 = x * x, x^4 = x^2 * x^2
    /// returns (true, value) if the result can be computed
    /// returns (false, 0) if the result cannot be computed
    fun try_simple_pow(x: FixedPoint64, y: FixedPoint64): (bool, FixedPoint64) {
        if (fixed_point64::get_raw_value(y) == 0) {
            // We solve the 0^0 indetermination by making it equal to one.
            (true, from_u64(1))
        } else if (fixed_point64::get_raw_value(x) == 0) {
            (true, zero())
        } else if (fixed_point64::get_raw_value(y) == ONE_RAW) {
            (true, x)
        } else if (fixed_point64::get_raw_value(y) == TWO_RAW) {
            (true, mul(x, x))
        } else if (fixed_point64::get_raw_value(y) == TWO_POW_2_RAW) {
            let x_squared = mul(x, x);
            (true, mul(x_squared, x_squared))
        } else {
            (false, zero())
        }
    }

    // formula: x^y = exp(y * ln(x))
    // this function does not check validity of x and y. Caller should ensure handling of special cases such as x = 0 or y = 0
    fun pow_internal(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (sign, ln_x) = ln(x);
        let y_times_ln_x = mul(y, ln_x);
        exp(sign, y_times_ln_x)
    }


    #[test_only] use std::debug::print;
    #[test_only] use sui::test_utils::{Self as test, destroy};

    #[test_only]
    public fun assert_eq(actual: &FixedPoint64, expected: &FixedPoint64) {
        let a = fixed_point64::raw_value(actual);
        let b = fixed_point64::raw_value(expected);
        test::assert_eq(*a,*b);
    }

    #[test_only]
    public fun assert_eq_precision(actual: &FixedPoint64, expected: &FixedPoint64, digits: u8) {
        let multiplier = from_u64(u64::powi(10, digits));
        let x = round(mul(*actual, multiplier));
        let y = round(mul(*expected,multiplier));
        test::assert_eq(x, y);
    }

    #[test]
    fun test_floor() {
        let v = fixed_point64::create_from_rational(1000, 7);
        assert_eq(floor(v), 142u128);
    }

    #[test]
    fun test_muxx() {
        let xx = mul(
            from_u64(10),
            from_u64(7),
        );
        let yy = div(
            xx,
            from_u64(3),
        );
        print(&yy);
        // assert_eq(floor(v), 142u128);
    }

    #[test]
    fun test_mul_div() {
        let v = mul_div(
            from_u64(10),
            from_u64(7),
            from_u64(3),
        );
        print(&v);
        // assert_eq(floor(v), 142u128);
    }

    #[test]
    fun test_exp() {
        let t = exp(1, from_u64(2));
        print(&vector[1245,88]);
        print(&math::display::from_fixedU64(&t));
    }
}
