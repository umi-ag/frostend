module frostend::root {
    use std::ascii::String;

    use sui::object::{Self, UID};
    use sui::dynamic_object_field as dof;
    use sui::transfer;
    use sui::tx_context::{TxContext};

    use frostend::vault;
    use frostend::bank;

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

    public fun vault_exists<X>(
        root: &mut Root,
    ): bool {
        dof::exists_<String>(&mut root.id, vault::get_type_name<X>())
    }

    public fun create_bank<X>(
        root: &mut Root,
        ctx: &mut TxContext,
    ) {
        assert!(!bank_exists<X>(root), 1);
        let bank = bank::new<X>(ctx);
        dof::add(&mut root.id, bank::get_type_name<X>(), bank);
    }

    public fun create_vault<X>(
        root: &mut Root,
        ctx: &mut TxContext,
    ) {
        assert!(!vault_exists<X>(root), 1);
        let vault = vault::new<X>(ctx);
        dof::add(&mut root.id, vault::get_type_name<X>(), vault);
    }
}
