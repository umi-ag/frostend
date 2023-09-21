#[test_only]
module sharbet::test_utils {
  use sui::coin::{mint_for_testing, Coin};
  use sui::tx_context::{TxContext};
  use sui::math;

  public fun mint<T>(amount: u64, decimals: u8, ctx: &mut TxContext): Coin<T> {
    mint_for_testing<T>(decimals(amount, decimals), ctx)
  }

  public fun decimals(amount: u64, decimals: u8): u64 {
    amount * math::pow(10, decimals)
  }
}
