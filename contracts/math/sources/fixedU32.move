/***
This is the helper module for std::fixed_point32
*/
module math::fixedU32 {
    use std::fixed_point32::{Self, FixedPoint32};

    // A FixedPoint32 represnets 0
    public fun zero(): FixedPoint32 {
        fixed_point32::create_from_rational(0, 1)
    }

    // Convert a u64 to a FixedPoint32
    public fun from_u64(val: u64): FixedPoint32 {
        fixed_point32::create_from_rational(val, 1)
    }

    // Greater than
    public fun gt(a: FixedPoint32, b: FixedPoint32): bool {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        return a_raw > b_raw
    }

    // greater than equal
    public fun gte(a: FixedPoint32, b: FixedPoint32): bool {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        return a_raw >= b_raw
    }

    // Less than
    public fun lt(a: FixedPoint32, b: FixedPoint32): bool {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        return a_raw < b_raw
    }

    /// TODO: Remove this, but it's needed for now because
    /// Unbound function 'floor' in module '(std=0x1)::fixed_point32'
    public fun floor(num: FixedPoint32): u64 {
        let raw_value = fixed_point32::get_raw_value(num);
        let integer_part = raw_value >> 32; // Shift right to remove the fractional part
        integer_part
    }

    /// TODO: Remove this, but it's needed for now because
    /// Unbound function 'floor' in module '(std=0x1)::fixed_point32'

    // Add 2 FixedPoint32 numers
    public fun add(a: FixedPoint32, b: FixedPoint32): FixedPoint32 {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        fixed_point32::create_from_raw_value(a_raw + b_raw)
    }

    // Substract 2 FixedPoint32 numers
    public fun sub(a: FixedPoint32, b: FixedPoint32): FixedPoint32 {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        fixed_point32::create_from_raw_value(a_raw - b_raw)
    }

    // Multiple 2 FixedPoint32 numers
    public fun mul(a: FixedPoint32, b: FixedPoint32): FixedPoint32 {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        let unscaled_res = (a_raw as u128) * (b_raw as u128);
        let scaled_res = (unscaled_res >> 32 as u64);
        fixed_point32::create_from_raw_value(scaled_res)
    }


    // Divide 2 FixedPoint32 numers
    public fun div(a: FixedPoint32, b: FixedPoint32): FixedPoint32 {
        let a_raw = fixed_point32::get_raw_value(a);
        let b_raw = fixed_point32::get_raw_value(b);
        fixed_point32::create_from_rational(a_raw, b_raw)
    }
    // Power function for FixedPoint32 numbers
    public fun powi(base: FixedPoint32, exponent: u64): FixedPoint32 {
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

    // Power function for FixedPoint32 base and FixedPoint32 exponent
    public fun powfp(base: FixedPoint32, exponent: FixedPoint32): FixedPoint32 {
        let ln_base = ln_approx(base);
        let exponent_times_ln_base = mul(exponent, ln_base);
        let result = exp_approx(exponent_times_ln_base);
        result
    }

    // Natural logarithm approximation using Taylor series
    public fun ln_approx(x: FixedPoint32): FixedPoint32 {
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
    public fun exp_approx(x: FixedPoint32): FixedPoint32 {
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
}
