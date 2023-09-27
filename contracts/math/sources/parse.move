#[allow(unused_function)]
module math::parse {
    use std::ascii::{is_valid_char};
    use std::vector::{length, borrow};
    use std::debug::print;

    use math::fixed_point64::{Self, FixedPoint64};


    /// This function converts a byte vector representing a decimal number into a FixedPoint64.
    /// Note: Due to the binary representation of decimal numbers in computers,
    /// the result may not be exact and should be treated as an approximation.
    public fun into_fixedU64(bytes: vector<u8>): FixedPoint64 {
        let len = length(&bytes);
        let integer_part: u128 = 0;
        let fractional_part: u128 = 0;
        let is_fraction = false;
        let frac_base: u128 = 1;

        let i = 0;
        while (i < len) {
            let b = *borrow(&bytes, i);
            if (is_valid_char(b)) {
                if (b == 46) { // ASCII for '.'
                    is_fraction = true;
                } else {
                    let digit = (b as u128) - 48; // ASCII for '0'
                    if (is_fraction) {
                        fractional_part = fractional_part * 10 + digit;
                        frac_base = frac_base * 10;
                    } else {
                        integer_part = integer_part * 10 + digit;
                    };
                };
            };
            i = i + 1;
        };

        // Calculate the fractional part
        let fractional_result: u128 = 0;
        let temp_frac = fractional_part;
        let temp_base = frac_base;
        while (temp_frac > 0) {
            let digit = temp_frac % 10;
            fractional_result = fractional_result + ((digit << 64) / temp_base);
            temp_frac = temp_frac / 10;
            temp_base = temp_base / 10;
        };

        fixed_point64::create_from_raw_value(
            (integer_part << 64) | fractional_result
        )
    }


    #[test_only] use math::fixedU64;

    #[test]
    fun debug() {
        let r = into_fixedU64(b"3.1415");
        print(&math::display::format_fixedU64_pretty(&r));

        let r = into_fixedU64(b"0.1415");
        print(&math::display::format_fixedU64_pretty(&r));

        let r = into_fixedU64(b"123456");
        print(&math::display::format_fixedU64_pretty(&r));
    }


    #[test_only] const PRECISION: u8 = 12;

    #[test]
    fun test_pi() {
        let actual = into_fixedU64(b"3.14159265358979323846264338327950288");
        let expected = fixedU64::PI();

        fixedU64::assert_eq_precision(&actual, &expected,  PRECISION);
    }

    #[test]
    fun test_E() {
        let actual = into_fixedU64(b"2.71828182845904523536028747135266250");
        let expected = fixedU64::E();

        fixedU64::assert_eq_precision(&actual, &expected, PRECISION);
    }
}
