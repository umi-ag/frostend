module toolkit::vector {
    use std::ascii::{Self, String};
    use std::type_name;
    use std::vector;

    use std::fixed_point32::{Self, FixedPoint32};

    #[test_only] use sui::test_utils::{assert_eq};

    public fun slice<Element: copy>(
        v: &vector<Element>,
        start_index: u64,
        end_index: u64
    ): vector<Element> {
        let len = vector::length(v);
        let new_vec = vector::empty<Element>();
        let i = start_index;

        // Ensure start_index and end_index are in the valid range.
        let s = if (start_index > len) { len } else { start_index };
        let e = if (end_index > len) { len } else { end_index };

        while (i < e) {
            let elem = vector::borrow(v, i);
            vector::push_back(&mut new_vec, *elem);
            i = i + 1;
        };

        new_vec
    }

    #[test_only]
    public fun assert_eq_precision(a_bytes: vector<u8>, b_bytes: vector<u8>, digits: u64) {
        assert_eq(
            slice(&a_bytes, 0, digits),
            slice(&b_bytes, 0, digits),
        )
    }
}
