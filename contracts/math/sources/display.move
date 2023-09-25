module math::display {
    use std::ascii::{Self, String};
    use std::debug::print;
    use std::vector;

    public fun from_u64(num: u64): String {
        let num_str_bytes = vector::empty<u8>();
        let n = num;
        let ten = 10;
        let count = 0;

        // Handle zero explicitly
        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30); // ASCII for '0'
            return ascii::string(num_str_bytes);
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

    public fun from_u128(num: u128): String {
        let num_str_bytes = vector::empty<u8>();
        let n = num;
        let ten = 10;
        let count = 0;

        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30);
            return ascii::string(num_str_bytes);
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

    public fun from_u256(num: u256): String {
        let num_str_bytes = vector::empty<u8>();
        let n = num;
        let ten = 10;
        let count = 0;

        if (n == 0) {
            vector::push_back(&mut num_str_bytes, 0x30);
            return ascii::string(num_str_bytes);
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


    #[test_only] use math::u64;
    #[test_only] use math::u128;
    #[test_only] use math::u256;

    #[test]
    fun test_u64() {
        print(&from_u64(114514));
        print(&from_u64(u64::max_value()));
    }

    #[test]
    fun test_u128() {
        print(&from_u128(u128::max_value()));
    }

    #[test]
    fun test_u256() {
        print(&from_u256(u256::max_value()));
    }
}
