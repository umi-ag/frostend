#[allow(unused_use)]
#[test_only]
module sharbet::test_actions {
    use std::debug::print;

    use sui::sui::{SUI};
    use sui::coin::{Self, Coin, TreasuryCap, CoinMetadata};
    use sui::transfer;
    use sui_system::sui_system::{SuiSystemState};
    use sui_system::governance_test_utils::{
        create_sui_system_state_for_testing,
        create_validator_for_testing,
        advance_epoch,
        assert_validator_total_stake_amounts,
        advance_epoch_with_reward_amounts
    };
    use sui::test_scenario::{Self as test, ctx};

    use toolkit::test_utils::{mint};

    use sharbet::actions;
    use sharbet::shasui::{Self, SHASUI};
    use sharbet::stake_manager::{Self, StakeProfile};
    use sharbet::unstsui::{Self, UnstakeTicket, UnstSuiTreasuryCap};

    const ALICE: address = @0xA11CE;
    const MYSTEN_LABS: address = @0x4;

    fun init_sui_system_state() {
        let scenario_val = test::begin(@0x0);
        let scenario = &mut scenario_val;
        let ctx = test::ctx(scenario);

        let validators = vector[
                create_validator_for_testing(MYSTEN_LABS, 100, ctx),
        ];
        create_sui_system_state_for_testing(validators, 1000, 0, ctx);
        test::end(scenario_val);
    }

    #[test]
    fun test_A2(){
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        {
            {
                let ctx = test::ctx(test);
                shasui::init_for_testing(ctx);
                stake_manager::init_for_testing(ctx);
            };
            test::next_tx(test, ALICE);
            {
                let treasury_shasui = test::take_shared<TreasuryCap<SHASUI>>(test);
                {
                    let ctx = test::ctx(test);

                    let coin_shasui = mint<SHASUI>(100, 8, ctx);
                    transfer::public_transfer(coin_shasui, ALICE);
                };
                test::return_shared(treasury_shasui);
            };
        };
        test::end(scenario);
    }

    #[test]
    fun test_A3(){
        init_sui_system_state();
        let scenario = test::begin(@0x0);
        let test = &mut scenario;
        {
            let wrapper = test::take_shared<SuiSystemState>(test);
            test::return_shared(wrapper);
        };
        test::end(scenario);
    }

    #[test]
    fun test_A4(){
        let scenario = test::begin(@0x1);
        let test = &mut scenario;
        {
            init_sui_system_state();
            test::next_tx(test, ALICE);
            {
                shasui::init_for_testing(ctx(test));
                stake_manager::init_for_testing(ctx(test));
            };
            test::next_tx(test, ALICE);
            {
                let wrapper = test::take_shared<SuiSystemState>(test);
                let stake_profile = test::take_shared<StakeProfile>(test);
                let treasury_shasui = test::take_shared<TreasuryCap<SHASUI>>(test);

                test::return_shared(wrapper);
                test::return_shared(stake_profile);
                test::return_shared(treasury_shasui);
            };
        };
        test::end(scenario);
    }

    #[test]
    fun test_A6(){
        let scenario = test::begin(@0x1);
        let test = &mut scenario;
        {
            init_sui_system_state();
            test::next_tx(test, ALICE);
            {
                shasui::init_for_testing(ctx(test));
                stake_manager::init_for_testing(ctx(test));
                unstsui::init_for_testing(ctx(test));
            };
            test::next_tx(test, ALICE);
            {
                let wrapper = test::take_shared<SuiSystemState>(test);
                let stake_profile = test::take_shared<StakeProfile>(test);
                let treasury_shasui = test::take_shared<TreasuryCap<SHASUI>>(test);
                let treasury_unstsui = test::take_shared<UnstSuiTreasuryCap>(test);
                {
                    let coin_shsaui = actions::stake_sui_to_mint_shasui(
                        &mut stake_profile,
                        mint<SUI>(100, 9, ctx(test)),
                        &mut wrapper,
                        &mut treasury_shasui,
                        MYSTEN_LABS,
                        ctx(test),
                    );
                    let unstake_ticket = actions::burn_shasui_to_mint_unstsui(
                        &mut stake_profile,
                        coin_shsaui,
                        &mut treasury_shasui,
                        &mut treasury_unstsui,
                        ctx(test),
                    );
                    print(&unstake_ticket);
                    transfer::public_transfer(unstake_ticket, ALICE);
                };
                test::return_shared(wrapper);
                test::return_shared(stake_profile);
                test::return_shared(treasury_shasui);
                test::return_shared(treasury_unstsui);
            };
        };
        test::end(scenario);
    }
}
