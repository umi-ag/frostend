#[allow(unused_field)]
module sharbet::unstsui {
    use std::string::{utf8, String};

    use sui::balance::{Self, Balance, Supply};
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{TxContext};

    friend sharbet::sha_manager;

    struct UNSTSUI has drop {}
    struct UNSTSUI_COIN has drop {}

    struct UnstakeTicket has key, store {
        id: UID,
        balance: Balance<UNSTSUI_COIN>,
        unstake_timestamp: u64,
    }

    struct UnstSuiTreasuryCap has key, store {
        id: UID,
        total_supply: Supply<UNSTSUI_COIN>
    }

    fun init(otw: UNSTSUI, ctx: &mut TxContext) {
        let treasury_cap = UnstSuiTreasuryCap {
            id: object::new(ctx),
            total_supply: balance::create_supply(UNSTSUI_COIN {}),
        };
        transfer::public_share_object(treasury_cap);

        let keys = vector[
            utf8(b"name"),
            utf8(b"link"),
            utf8(b"image_url"),
            utf8(b"description"),
            utf8(b"project_url"),
            utf8(b"creator"),
        ];

        let values = vector[
            utf8(b"Sharbet Unstake Ticket"),
            utf8(b"https://frostend.pages.dev"),
            utf8(b"https://github-production-user-asset-6210df.s3.amazonaws.com/14998939/269516115-0c916e62-76e2-4b10-b9ef-563f0a8da539.png"),
            utf8(b"Sharbet Unstake Ticket"),
            utf8(b"https://frostend.pages.dev"),
            utf8(b"Sharbet")
        ];

        let publisher = package::claim(otw, ctx);

        let display = display::new_with_fields<UnstakeTicket>(
            &publisher, keys, values, ctx
        );

        display::update_version(&mut display);

        transfer::public_share_object(publisher);
        transfer::public_freeze_object(display);
    }

    public(friend) fun mint(
        cap: &mut UnstSuiTreasuryCap,
        amount: u64,
        unstake_timestamp: u64,
        ctx: &mut TxContext,
    ): UnstakeTicket {
        UnstakeTicket {
            id: object::new(ctx),
            balance: balance::increase_supply(&mut cap.total_supply, amount),
            unstake_timestamp,
        }
    }

    public(friend) fun burn(
        cap: &mut UnstSuiTreasuryCap,
        c: UnstakeTicket,
    ): u64 {
        let UnstakeTicket { id, balance, unstake_timestamp : _ } = c;
        object::delete(id);
        balance::decrease_supply(&mut cap.total_supply, balance)
    }


    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(UNSTSUI {}, ctx)
    }
}
