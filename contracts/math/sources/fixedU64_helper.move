/***
This is the helper module for std::fixed_point64
*/
module math::fixedU64_helper {
    use math::fixed_point64::{Self, FixedPoint64};
    use math::fixedU64;

    // Error codes.

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

    const PRECISION: u8 = 64; // number of bits in the mantissa

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
        result = fixedU64::mul(result, fixed_point64::create_from_u128(LOG_2_E_INV_RAW));
        (sign, result)
    }

    public fun exp(sign: u8, x: FixedPoint64): FixedPoint64 {
        assert!(fixed_point64::get_raw_value(x) < TWO_POW_6_RAW, ERR_EXPONENT_TOO_LARGE);
        let result;
        if (fixed_point64::get_raw_value(x) == 0) {
            result = fixedU64::from_u64(1);
        } else if (sign == 0) {
            result = fixedU64::div(fixedU64::from_u64(1), exp(1, x));
        } else if (fixed_point64::get_raw_value(x) == ONE_RAW) {
            result = fixed_point64::create_from_u128(EXP_1_RAW);
        } else {
            result = fixedU64::from_u64(1);

            if (fixed_point64::get_raw_value(x) >= TWO_POW_5_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_5_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_32_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_4_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_4_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_16_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_3_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_3_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_8_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_2_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_2_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_4_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_2_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= ONE_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(ONE_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_1_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_NEG_1_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_NEG_1_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_1_OVER_2_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_NEG_2_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_NEG_2_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_1_OVER_4_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_NEG_3_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_NEG_3_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_1_OVER_8_RAW));
            };
            if (fixed_point64::get_raw_value(x) >= TWO_POW_NEG_4_RAW) {
                x = fixedU64::sub(x, fixed_point64::create_from_u128(TWO_POW_NEG_4_RAW));
                result = fixedU64::mul(result, fixed_point64::create_from_u128(EXP_1_OVER_16_RAW));
            };

            // now, x is in the range [0, e^{1/16})
            // if x is 0, we can directly return
            // otherwise, use Taylor series expansion for e^x: 1 + x + (x^2 / 2!) + (x^3 / 3!) + ... + (x^n / n!).

            if (fixed_point64::get_raw_value(x) != 0) {
                let term = x;
                let series_sum = fixedU64::from_u64(1);
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(2));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(3));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(4));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(5));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(6));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x), fixedU64::from_u64(7));
                series_sum = fixedU64::add(series_sum, term);

                term = fixedU64::div(fixedU64::mul(term, x),fixedU64::from_u64(8));
                series_sum = fixedU64::add(series_sum, term);

                result = fixedU64::mul(result, series_sum);
            };
        };
        result
    }

    spec exp {
        // opaque is required for recursive function
        // otherwise move prover will complain even if we don't prove anything here
        pragma opaque;
    }

    public fun pow(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
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
            fixedU64::mul(pow_internal(x, y), fixed_point64::create_from_u128(ONE_PLUS_TEN_EXP_MINUS_9))
        }
    }

    /// pow_down multiplies pow result by (1 - 10^-9) if numerical approximation is used in pow
    /// based on experiments, the result is always smaller than or equal to the true value
    public fun pow_down(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (success, result) = try_simple_pow(x, y);
        if (success) {
            result
        } else {
            fixedU64::mul(pow_internal(x, y), fixed_point64::create_from_u128(ONE_MINUS_TEN_EXP_MINUS_9))
        }
    }

    /// try_simple_pow returns the result of pow if it can be computed using simple rules
    /// e.g. x^0 = 1, x^1 = x, x^2 = x * x, x^4 = x^2 * x^2
    /// returns (true, value) if the result can be computed
    /// returns (false, 0) if the result cannot be computed
    fun try_simple_pow(x: FixedPoint64, y: FixedPoint64): (bool, FixedPoint64) {
        if (fixed_point64::get_raw_value(y) == 0) {
            // We solve the 0^0 indetermination by making it equal to one.
            (true, fixedU64::from_u64(1))
        } else if (fixed_point64::get_raw_value(x) == 0) {
            (true, fixedU64::zero())
        } else if (fixed_point64::get_raw_value(y) == ONE_RAW) {
            (true, x)
        } else if (fixed_point64::get_raw_value(y) == TWO_RAW) {
            (true, fixedU64::mul(x, x))
        } else if (fixed_point64::get_raw_value(y) == TWO_POW_2_RAW) {
            let x_squared = fixedU64::mul(x, x);
            (true, fixedU64::mul(x_squared, x_squared))
        } else {
            (false, fixedU64::zero())
        }
    }

    // formula: x^y = exp(y * ln(x))
    // this function does not check validity of x and y. Caller should ensure handling of special cases such as x = 0 or y = 0
    fun pow_internal(x: FixedPoint64, y: FixedPoint64): FixedPoint64 {
        let (sign, ln_x) = ln(x);
        let y_times_ln_x = fixedU64::mul(y, ln_x);
        exp(sign, y_times_ln_x)
    }
}

