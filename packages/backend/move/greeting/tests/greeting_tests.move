// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

#[test_only]
module greeting::greeting_tests {
  use greeting::greeting;
  use sui::test_utils;
  use sui::random::{Self, Random};
  use sui::test_scenario as ts;

  #[test]
  /// Tests successful run of the set_greeting() and reset_greeting() functions.
  fun test_greeting() {
    let user1 = @0x0;
    let mut ts = ts::begin(user1);
     
    // Setup randomness.
    random::create_for_testing(ts.ctx());
    ts.next_tx(user1);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
        ts.ctx(),
    );

    ts.next_tx(user1);
    let mut g = greeting::new_for_testing(b"Bob", ts.ctx());
    assert!(greeting::name(&g) == b"Bob", 0);
    assert!(greeting::emoji(&g) == 0, 1);

    ts.next_tx(user1);
    greeting::set_greeting(&mut g, b"Alice", &random_state, ts.ctx());
    assert!(greeting::name(&g) == b"Alice", 2);
    assert!(greeting::emoji(&g) <= greeting::maxEmojis(), 3);

    ts.next_tx(user1);
    greeting::reset_greeting(&mut g);
    assert!(greeting::name(&g) == b"", 4);
    assert!(greeting::emoji(&g) == 0, 5);

    test_utils::destroy(g);
    ts::return_shared(random_state);
    ts.end();
  }

  #[test]
  #[expected_failure(abort_code = greeting::EEmptyName)]
  /// Tests failed run of the set_greeting() in case of the empty name.
  fun test_set_greeting_fail() {
    let user1 = @0x0;
    let mut ts = ts::begin(user1);
     
    // Setup randomness.
    random::create_for_testing(ts.ctx());
    ts.next_tx(user1);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
        ts.ctx(),
    );

    ts.next_tx(user1);
    let mut g = greeting::new_for_testing(b"Bob", ts.ctx());
    assert!(greeting::name(&g) == b"Bob", 0);
    assert!(greeting::emoji(&g) == 0, 1);

    ts.next_tx(user1);
    // Should fail.
    greeting::set_greeting(&mut g, b"", &random_state, ts.ctx());

    test_utils::destroy(g);
    ts::return_shared(random_state);
    ts.end();
  }
}
