// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting {

  // === Imports === //

  // use std::debug;
  use sui::event::emit;

  // === Constants === //

  // === Errors === //

  const EEmptyName: u64 = 1;

  // === Structs === //

  public struct Greeting has key, store {
    id: UID,
    name: vector<u8>,
  }

  // === Events === //

  /// Emitted when the net is set.
  public struct NameSetEvent has copy, drop {
    greeting_id: ID,
    old_name: vector<u8>,
    new_name: vector<u8>
  }

  // === Initializer === //

  #[allow(lint(share_owned))]
  /// Create and share a Greeting object.
  fun init(ctx: &mut TxContext) {
    // Create the Greeting object.
    let greeting = Greeting {
      id: object::new(ctx),
      name: vector::empty<u8>()
    };

    // Share the Greeting object with everyone.
    transfer::share_object(greeting);
  }

  // === Public view functions === //

  /// Returns the name of currently greeted person.
  public fun name(self: &Greeting): vector<u8> {
    self.name
  }

  // === Public mutate functions === //

  /// Sets the name of currently greeted person.
  public fun set_name(self: &mut Greeting, name: vector<u8>) {
    assert!(name.length() > 0, EEmptyName);

    let old_name = self.name;

    // debug::print(self);
    self.name = name;
    // debug::print(self);

    let greeting_id = object::uid_to_inner(&self.id);

    emit(NameSetEvent {
      greeting_id,
      old_name,
      new_name: self.name
    });
  }

  // === Public functions for test === //

  #[test_only]
  /// Create a new Greeting for tests.
  public fun new_for_testing(name: vector<u8>, ctx: &mut TxContext): Greeting {
    Greeting {
      id: object::new(ctx),
      name
    }
  }
}
