
#[allow(unused_function)]
module math::test_display {

    use std::debug::print;
    use sui::test_utils::{assert_eq};
    use std::ascii;

    use math::u64;
    use math::u128;
    use math::u256;
    use math::fixedU64;



    #[test]
    fun test_parse_fixedU64 () {
        fixedU64::assert_eq_precision(
            &math::parse::into_fixedU64( b"3.14159265358979323846264338327950288"),
            &fixedU64::PI(),
            12
        );
    }

    #[test]
    fun test_format_fixedU64 () {
        math::display::assert_eq_precision(
            ascii::into_bytes(
                math::display::format_fixedU64( &fixedU64::PI()),
            ),
            b"3.14159265358979323846264338327950288",
        18,
        );
    }
}
