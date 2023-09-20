module sharbet::unstake_policy {
    use sui::transfer_policy::{
        Self as policy,
        TransferPolicy,
        TransferPolicyCap,
        TransferRequest
    };

    const ERuleNotFound: u64 = 0;

    struct Rule has drop {}

    public fun add<T>(
        policy: &mut TransferPolicy<T>,
        cap: &TransferPolicyCap<T>
    ) {
        policy::add_rule(Rule {}, policy, cap, true);
    }

    public fun confirm<T>(
        policy: &TransferPolicy<T>,
        request: &mut TransferRequest<T>,
    ) {
        policy::add_receipt(Rule {}, request)
    }
}
