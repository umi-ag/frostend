#[allow(unused_field)]
module sharbet::unstake_ticket {
    use sui::balance::{Self, Balance, Supply};
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{TxContext};

    friend sharbet::sha_manager;

    struct UnstSUI has drop {}

    struct UnstakeTicket has key, store {
        id: UID,
        balance: Balance<UnstSUI>,
        unstake_timestamp: u64,
    }

    struct UnstSuiTreasuryCap has key, store {
        id: UID,
        total_supply: Supply<UnstSUI>
    }

    fun init(ctx: &mut TxContext) {
        let treasury_cap = UnstSuiTreasuryCap {
            id: object::new(ctx),
            total_supply: balance::create_supply( UnstSUI {} ),
        };
        transfer::public_share_object(treasury_cap);
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
        init(ctx)
    }
}
