/***
This is the helper module for std::fixed_point64
*/
module math::fixedU64 {
    use math::fixed_point64::{Self, FixedPoint64};

    // A FixedPoint64 represnets 0
    public fun zero(): FixedPoint64 {
        fixed_point64::create_from_rational(0, 1)
    }

    // Convert a u64 to a FixedPoint64
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

    /// TODO: Remove this, but it's needed for now because
    /// Unbound function 'floor' in module '(std=0x1)::fixed_point64'
    public fun floor(num: FixedPoint64): u128 {
        let raw_value = fixed_point64::get_raw_value(num);
        let integer_part = raw_value >> 32; // Shift right to remove the fractional part
        integer_part
    }

    /// TODO: Remove this, but it's needed for now because
    /// Unbound function 'floor' in module '(std=0x1)::fixed_point64'

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

    // Divide 2 FixedPoint64 numers
    public fun div(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        fixed_point64::create_from_rational(a_raw, b_raw)
    }

    // Multiple 2 FixedPoint64 numers
    public fun mul(a: FixedPoint64, b: FixedPoint64): FixedPoint64 {
        let a_raw = fixed_point64::get_raw_value(a);
        let b_raw = fixed_point64::get_raw_value(b);
        let unscaled_res = (a_raw as u256) * (b_raw as u256);
        let scaled_res = (unscaled_res >> 32 as u128);
        fixed_point64::create_from_raw_value(scaled_res)
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

    // Power function for FixedPoint64 base and FixedPoint64 exponent
    public fun powf(base: FixedPoint64, exponent: FixedPoint64): FixedPoint64 {
        let ln_base = ln_approx(base);
        let exponent_times_ln_base = mul(exponent, ln_base);
        let result = exp_approx(exponent_times_ln_base);
        result
    }

    // Natural logarithm approximation using Taylor series
    public fun ln_approx(x: FixedPoint64): FixedPoint64 {
        let sum = zero();
        let term = x;
        let n = from_u64(1);

        let iteration_limit = from_u64(10); // Iterate 10 times for approximation
        while (lt(n, iteration_limit)) {
            sum = add(sum, div(term, n));
            n = add(n, from_u64(1));
            term = mul(term, x);
            term = sub(zero(), term); // Alternate the sign
        };

        sum
    }

    // Exponential function approximation using Taylor series
    public fun exp_approx(x: FixedPoint64): FixedPoint64 {
        let sum = from_u64(1);
        let term = from_u64(1);
        let factorial = from_u64(1);
        let n = from_u64(1);

        let iteration_limit = from_u64(10); // Iterate 10 times for approximation
        while (lt(n, iteration_limit)) {
            term = mul(term, x);
            factorial = mul(factorial, n);
            sum = add(sum, div(term, factorial));
            n = add(n, from_u64(1));
        };

        sum
    }

    // Euler_s number (e)
    // 2.71828182845904523536028747135266250f64;
    public fun E(): FixedPoint64 {
        fixed_point64::create_from_rational(
            271_828_182_845_904_523_536_028_747_135_266_250,
            010_000_000_000_000_000_000_000_000_000_000_000,
        )
    }
}
