// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

#[test_only]
module greeting::greeting_tests {
  use greeting::greeting;
  use sui::test_utils;

  #[test]
  /// Tests successful run of the set_name() function.
  fun test_set_name() {
    let ctx = &mut tx_context::dummy();

    let mut g = greeting::new_for_testing(b"Bob", ctx);

    assert!(greeting::name(&g) == b"Bob", 0);

    greeting::set_name(&mut g, b"Alice", ctx);

    assert!(greeting::name(&g) == b"Alice", 1);

    test_utils::destroy(g);
  }

  #[test, expected_failure(abort_code = greeting::EEmptyName)]
  /// Tests successful run of the set_name() function.
  fun test_set_name_fail() {
    let ctx = &mut tx_context::dummy();

    let mut g = greeting::new_for_testing(b"Bob", ctx);

    assert!(greeting::name(&g) == b"Bob", 0);

    greeting::set_name(&mut g, b"", ctx);

    test_utils::destroy(g);
  }
}
