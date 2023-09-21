#[allow(unused_field)]
module sharbet::event_emit {
    use sui::event::emit;

    struct EventDebug has copy, drop {
        value: u64,
    }

    public fun debug(value: u64) {
        emit(EventDebug { value });
    }

    struct EventVector has copy, drop {
        value: vector<u64>,
    }

    public fun vec(value: vector<u64>) {
        emit(EventVector { value });
    }
}
