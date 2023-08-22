module frostend::time_rule {
    use std::option::{Self, Option, some, none};
    use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
    use sui::clock::{Self, Clock};

    const ETooSoon: u64 = 10;
    const ETooLate: u64 = 11;

    struct Rule has drop {}

    struct Config has store, drop {
        start_time: Option<u64>,
        end_time: Option<u64>,
    }

    public fun add<T>(
        policy: &mut TransferPolicy<T>,
        cap: &TransferPolicyCap<T>,
        start_time: u64, // if 0, then no start time
        end_time: u64, // if 0, then no end time
    ) {
        let config = Config {
            start_time: if (start_time == 0) { none() } else { some(start_time) },
            end_time: if (end_time == 0) { none() } else { some(end_time) },
        };

        transfer_policy::add_rule(Rule {}, policy, cap, config);
    }

    public fun is_too_soon<T>(
        policy: &TransferPolicy<T>,
        clock: &Clock
    ): bool {
        let config: &Config = transfer_policy::get_rule(Rule {}, policy);
        if (option::is_some(&config.start_time)) {
            return clock::timestamp_ms(clock) < *option::borrow(&config.start_time);
        };

        false
    }

    public fun is_too_late<T>(
        policy: &TransferPolicy<T>,
        clock: &Clock
    ): bool {
        let config: &Config = transfer_policy::get_rule(Rule {}, policy);
        if (option::is_some(&config.end_time)) {
            return clock::timestamp_ms(clock) > *option::borrow(&config.end_time);
        };

        false
    }

    public fun confirm_time<T>(
        policy: &TransferPolicy<T>,
        request: &mut TransferRequest<T>,
        clock: &Clock
    ) {
        let config: &Config = transfer_policy::get_rule(Rule {}, policy);
        assert!(!is_too_soon(policy, clock), ETooSoon);
        assert!(!is_too_late(policy, clock), ETooLate);
        transfer_policy::add_receipt(Rule {}, request)
    }
}
