#[allow(unused_function)]
module math::display {
    use std::ascii::{Self, String};
    use std::type_name;
    use std::vector;

    use std::fixed_point32::{Self, FixedPoint32};
    use math::fixed_point64::{Self, FixedPoint64};

    fun get_type_name<X>(): String {
        type_name::into_string(type_name::get<X>())
    }

    fun are_strings_equal(s1: &String, s2: &String): bool {
        let len1 = ascii::length(s1);
        let len2 = ascii::length(s2);

        if (len1 != len2) {
            return false
        };

        let i = 0;
        while (i < len1) {
            let byte1 = *vector::borrow(ascii::as_bytes(s1), i);
            let byte2 = *vector::borrow(ascii::as_bytes(s2), i);
            if (byte1 != byte2) {
                return false
            };
            i = i + 1;
        };

        true
    }

    fun are_types_equal<X, Y>(): bool {
        are_strings_equal(&get_type_name<X>(), &get_type_name<Y>())
    }

    public fun from_u64(num: &u64): String {
        let num_str_bytes = vector::empty<u8>();
        let n = *num;
        let ten = 10;
        let count = 0;

        // Handle zero explicitly
        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30); // ASCII for '0'
            return ascii::string(num_str_bytes)
        };

        // Convert the number to ASCII representation with commas
        while (n > 0) {
            if (count > 0 && count % 3 == 0) {
                vector::push_back(&mut num_str_bytes, 0x2C); // ASCII for ','
            };
            let digit = ((n % ten) as u8);
            vector::push_back(&mut num_str_bytes, digit + 0x30); // converting digit to ASCII
            n = n / ten;
            count = count + 1;
        };

        // Reverse the vector since the digits are in reverse order
        let len = vector::length(&num_str_bytes);
        let i = 0;
        while (i < len / 2) {
            let tmp = *vector::borrow(&num_str_bytes, i);
            *vector::borrow_mut(&mut num_str_bytes, i) = *vector::borrow(&num_str_bytes, len - i - 1);
            *vector::borrow_mut(&mut num_str_bytes, len - i - 1) = tmp;
            i = i + 1;
        };

        ascii::string(num_str_bytes)
    }

    public fun from_u128(num: &u128): String {
        let num_str_bytes = vector::empty<u8>();
        let n = *num;
        let ten = 10;
        let count = 0;

        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30);
            return ascii::string(num_str_bytes)
        };

        while (n > 0) {
            if (count > 0 && count % 3 == 0) {
                vector::push_back(&mut num_str_bytes, 0x2C);
            };
            let digit = ((n % ten) as u8);
            vector::push_back(&mut num_str_bytes, digit + 0x30);
            n = n / ten;
            count = count + 1;
        };

        let len = vector::length(&num_str_bytes);
        let i = 0;
        while (i < len / 2) {
            let tmp = *vector::borrow(&num_str_bytes, i);
            *vector::borrow_mut(&mut num_str_bytes, i) = *vector::borrow(&num_str_bytes, len - i - 1);
            *vector::borrow_mut(&mut num_str_bytes, len - i - 1) = tmp;
            i = i + 1;
        };

        ascii::string(num_str_bytes)
    }

    public fun from_u256(num: &u256): String {
        let num_str_bytes = vector::empty<u8>();
        let n = *num;
        let ten = 10;
        let count = 0;

        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30);
            return ascii::string(num_str_bytes)
        };

        while (n > 0) {
            if (count > 0 && count % 3 == 0) {
                vector::push_back(&mut num_str_bytes, 0x2C);
            };
            let digit = ((n % ten) as u8);
            vector::push_back(&mut num_str_bytes, digit + 0x30);
            n = n / ten;
            count = count + 1;
        };

        let len = vector::length(&num_str_bytes);
        let i = 0;
        while (i < len / 2) {
            let tmp = *vector::borrow(&num_str_bytes, i);
            *vector::borrow_mut(&mut num_str_bytes, i) = *vector::borrow(&num_str_bytes, len - i - 1);
            *vector::borrow_mut(&mut num_str_bytes, len - i - 1) = tmp;
            i = i + 1;
        };

        ascii::string(num_str_bytes)
    }

    public fun from_fixedU32(num: &FixedPoint32): String {
        let raw_value = fixed_point32::get_raw_value(*num);
        let integer_part = raw_value >> 32;
        let fractional_part = raw_value & 0xFFFFFFFF;

        let result = vector::empty<u8>();

        // Convert integer part to ASCII and add to result vector
        let int_part = integer_part;
        let digit_count = 0;
        if (int_part == 0) {
            vector::push_back(&mut result, 48); // using 48 as ASCII value for '0'
        } else {
            while (int_part > 0) {
                if (digit_count > 0 && digit_count % 3 == 0) {
                    vector::push_back(&mut result, 44); // using 44 as ASCII value for ','
                };
                let digit = ((int_part % 10) as u8) + 48; // using 48 as ASCII value for '0'
                vector::push_back(&mut result, digit);
                int_part = int_part / 10;
                digit_count = digit_count + 1;
            };
            vector::reverse(&mut result);
        };

        // Add dot
        vector::push_back(&mut result, 46); // using 46 as ASCII value for '.'

        // Convert fractional part to ASCII and add to result vector
        let frac_part = fractional_part;
        let count = 0;
        while (count < 32) {
            frac_part = frac_part * 10;
            let digit = ((frac_part >> 32) as u8) + 48; // using 48 as ASCII value for '0'
            vector::push_back(&mut result, digit);
            frac_part = frac_part & 0xFFFFFFFF;
            count = count + 1;
        };

        ascii::string(result)
    }

    public fun from_fixedU64(num: &FixedPoint64): String {
        let raw_value = fixed_point64::get_raw_value(*num);
        let integer_part = raw_value >> 64;
        let fractional_part = raw_value & 0xFFFFFFFFFFFFFFFF;

        let result = vector::empty<u8>();

        // Convert integer part to ASCII and add to result vector with comma separation
        let int_part = integer_part;
        let digit_count = 0;
        if (int_part == 0) {
            vector::push_back(&mut result, 48); // using 48 as ASCII value for '0'
        } else {
            while (int_part > 0) {
                if (digit_count > 0 && digit_count % 3 == 0) {
                    vector::push_back(&mut result, 44); // using 44 as ASCII value for ','
                };
                let digit = ((int_part % 10) as u8) + 48; // using 48 as ASCII value for '0'
                vector::push_back(&mut result, digit);
                int_part = int_part / 10;
                digit_count = digit_count + 1;
            };
            vector::reverse(&mut result);
        };

        // Add dot
        vector::push_back(&mut result, 46); // using 46 as ASCII value for '.'

        // Convert fractional part to ASCII and add to result vector
        let frac_part = fractional_part;
        let count = 0;
        while (count < 64) {
            frac_part = frac_part * 10;
            let digit = ((frac_part >> 64) as u8) + 48; // using 48 as ASCII value for '0'
            vector::push_back(&mut result, digit);
            frac_part = frac_part & 0xFFFFFFFFFFFFFFFF;
            count = count + 1;
        };

        ascii::string(result)
    }




    #[test_only] use std::debug::print;
    #[test_only] use math::u64;
    #[test_only] use math::u128;
    #[test_only] use math::u256;

    #[test]
    fun test_u64() {
        print(&from_u64(&114514));
        print(&from_u64(&u64::max_value()));
    }

    #[test]
    fun test_u128() {
        print(&from_u128(&u128::max_value()));
    }

    #[test]
    fun test_u256() {
        print(&from_u256(&u256::max_value()));
    }

    #[test]
    fun test_fixedU32() {
        let v = fixed_point32::create_from_rational(10, 7);
        print(&from_fixedU32(&v));
    }

    #[test]
    fun test_fixedU64() {
        let v = fixed_point64::create_from_rational(10, 7);
        print(&from_fixedU64(&v));
    }
}
