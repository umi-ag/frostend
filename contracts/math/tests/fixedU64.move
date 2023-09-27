
#[allow(unused_function)]
module math::test_fiexdU64 {
    use sui::test_utils::{assert_eq};
    use std::ascii;
    use std::debug::print;

    use math::fixedU64;
    use math::display::{pretty_print_fixedU64};
    use math::fixedU64::{from_u64, PI, exp, ln, mul, log2, powfp, assert_eq_precision};

    #[test]
    fun test_log2() {
        let (sign, res) = log2(from_u64(2));
        print(&math::display::format_fixedU64_pretty(&res));
        assert_eq_precision(
            &res,
            &from_u64(1),
            12,
        );

        let (sign, res) = log2(PI());
        assert_eq_precision(
            &res,
            &math::parse::into_fixedU64(b"1.6514961294723187"),
            12,
        );
    }

    #[test]
    fun test_ln() {
        let (sign, res) = ln(from_u64(2));
        print(&vector[110002,0]);
        pretty_print_fixedU64(&res);
        assert_eq_precision(
            &res,
            &math::parse::into_fixedU64(b"0.6931471805599453"),
            8,
        );

        // let (sign, res) = ln(PI());
        // print(&vector[110002,2]);
        // pretty_print_fixedU64(&res);
        // assert_eq_precision(
        //     &res,
        //     &math::parse::into_fixedU64(b"0.6931471805599453"),
        //     8,
        // );
    }

    #[test]
    fun test_exp() {
        let actual = exp(1, from_u64(2));
        assert_eq_precision(
            &actual,
            &math::parse::into_fixedU64(b"7.38905609893065"),
            3,
        );

        let actual = exp(1, PI());
        assert_eq_precision(
            &actual,
            &math::parse::into_fixedU64(b"23.140692632779267"),
            8,
        );
    }

    #[test]
    fun test_powfp() {
        let x = from_u64(2);
        let y = from_u64(3);
        let (sign, ln_x) = ln(x);
        print(&vector[114,1]);
        pretty_print_fixedU64(&ln_x);
        let y_ln_x = mul(y, ln_x);
        print(&vector[114,2]);
        pretty_print_fixedU64(&y_ln_x);
        let bb =exp(sign, y_ln_x);
    }
}
