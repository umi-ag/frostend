// // https://kiosk.page/transfer-policy/writing-rules.html?search=paywall
// module frostend::pay_rule {
//     // skipping dependencies
//     use sui::transfer_policy::{Self, TransferPolicy, TransferRequest, TransferPolicyCap};
//     use sui::coin::{Self, Coin};
//     use sui::balance::{Self, Balance};
//     use sui::tx_context::TxContext;

//     const MAX_BP: u64 = 10_000;

//     struct Rule has drop {}

//     struct Vault<phantom PAY_COIN> has key, store {
//         balance: Balance<PAY_COIN>,
//     }

//     struct Config has store, drop {
//         amount_bp: u64
//     }

//     public fun add<T>(
//         policy: &mut TransferPolicy<T>,
//         cap: &TransferPolicyCap<T>,
//         amount_bp: u64
//     ) {
//         assert!(amount_bp <= MAX_BP, 0);
//         transfer_policy::add_rule(Rule {}, policy, cap, Config { amount_bp })
//     }

//     public fun pay<T, PAY_COIN>(
//         vault: &mut Vault<PAY_COIN>,
//         balance: Balance<PAY_COIN>,
//         policy: &mut TransferPolicy<T>,
//     ) {
//         policy.paid =  balance::value(balance);
//         balance::join(&mut vault.balance, balance );
//     }

//     public fun confirm_paid<T, PAY_COIN>(
//         policy: &mut TransferPolicy<T>,
//         request: &mut TransferRequest<T>,
//         payment: &mut Coin<PAY_COIN>,
//         ctx: &mut TxContext
//     ) {
//         let config: &Config = transfer_policy::get_rule(Rule {}, policy);
//         assert!(!is_too_soon(policy, clock), ETooSoon);
//         assert!(!is_too_late(policy, clock), ETooLate);
//         transfer_policy::add_receipt(Rule {}, request);

//         let config: &Config = policy::get_rule(Rule {}, policy);
//         let amount = (((paid as u128) * (config.amount_bp as u128) / MAX_BP) as u64);
//         assert!(coin::value(payment) >= amount, EInsufficientAmount);

//         let fee = coin::split(payment, amount, ctx);
//         policy::add_to_balance(Rule {}, policy, fee);
//         policy::add_receipt(Rule {}, request)
//     }
// }
