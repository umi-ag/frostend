module frostend::root {
    use std::ascii::String;

    use sui::object::{Self, UID};
    use sui::dynamic_field as df;
    use sui::dynamic_object_field as dof;
    use sui::transfer;
    use sui::tx_context::{TxContext};

    use frostend::vault::{Self};
    use frostend::bank::{Self};

    friend frostend::actions;

    struct Root has key, store {
        id: UID,
    }

    fun init(ctx: &mut TxContext) {
        let root = new(ctx);
        transfer::public_share_object(root, )
    }

    fun new(
        ctx: &mut TxContext,
    ): Root {
        Root {
            id: object::new(ctx),
        }
    }

    public fun bank_exists<X>(
        root: &mut Root,
    ): bool {
        dof::exists_<String>(&mut root.id, bank::get_type_name<X>())
    }

    // public fun vault_exists<X>(
    //     root: &mut Root,
    // ): bool {
    //     dof::exists_<String>(&mut root.id, vault::get_type_name<X>())
    // }

    public(friend) fun create_bank<X>(
        root: &mut Root,
        ctx: &mut TxContext,
    ) {
        assert!(!bank_exists<X>(root), 1);
        let bank = bank::new<X>(ctx);
        df::add(&mut root.id, bank::get_type_name<X>(), object::id(&bank));
        transfer::public_share_object(bank);
    }

    public(friend) fun create_vault<X>(
        // root: &mut Root,
        issued_at: u64,
        matures_at: u64,
        ctx: &mut TxContext,
    ) {
        // assert!(!vault_exists<X>(root), 1);
        let vault = vault::new<X>(issued_at, matures_at, ctx);
        // df::add(&mut root.id, vault::get_type_name<X>(), object::id(&vault));
        transfer::public_share_object(vault);
    }
}
