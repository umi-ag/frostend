#[allow(unused_function)]
module math::parse {
    use std::ascii::{Self, String, is_valid_char, as_bytes};
    use std::vector::{Self, length, borrow};
    use std::debug::print;

    use math::fixed_point64::{Self, FixedPoint64};

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

        // Adjust the fractional part based on the base
        fractional_part = fractional_part << 64;
        fractional_part = fractional_part / frac_base;

        fixed_point64::create_from_raw_value(
            ((integer_part as u128) << 64) | (fractional_part as u128)
        )
    }

    #[test]
    fun debug() {
        let r = into_fixedU64(b"3.1415");
        print(&math::display::from_fixedU64(&r));

        let r = into_fixedU64(b"0.1415");
        print(&math::display::from_fixedU64(&r));

        let r = into_fixedU64(b"123456");
        print(&math::display::from_fixedU64(&r));
    }
}
