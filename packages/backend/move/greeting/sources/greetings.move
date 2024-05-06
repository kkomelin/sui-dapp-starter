// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting {

  // === Imports ===

  // use std::debug;
  use sui::event::emit;

  // === Constants ===

  // === Errors ===

  // === Structs ===

  public struct Greeting has key {
    id: UID,
    name: vector<u8>,
  }

  // === Events ===

  /// Emitted when the greeting is created.
  public struct EventGreetingCreated has copy, drop {
    greeting_id: ID
  }

  /// Emitted when the name is set.
  public struct EventNameSet has copy, drop {
    greeting_id: ID,
    old_name: vector<u8>,
    new_name: vector<u8>
  }

  // === Initializer ===

  /// Create and share a Greeting object.
  public fun create(ctx: &mut TxContext) {
    // Create the Greeting object.
    let greeting = new(ctx);

    emit(EventGreetingCreated {
      greeting_id: greeting.id.to_inner(),
    });

    // Share the Greeting object with everyone.
    transfer::transfer(greeting, ctx.sender());
  }

  // === Public-Mutative Functions ===

  /// Sets the name of currently greeted person.
  public fun set_name(self: &mut Greeting, name: vector<u8>) {
    let old_name = self.name;

    // debug::print(self);
    self.name = name;
    // debug::print(self);

    let greeting_id = self.id.to_inner();

    emit(EventNameSet {
      greeting_id,
      old_name,
      new_name: self.name
    });
  }

  // === Public-View Functions ===

  /// Returns the name of currently greeted person.
  public fun name(self: &Greeting): vector<u8> {
    self.name
  }

  // === Private Functions ===

  fun new(ctx: &mut TxContext): Greeting {
    Greeting {
      id: object::new(ctx),
      name: vector::empty<u8>()
    }
  }

  // === Test Functions ===

  #[test_only]
  /// Create a new Greeting for tests.
  public fun new_for_testing(name: vector<u8>, ctx: &mut TxContext): Greeting {
    let mut greeting = new(ctx);
    greeting.name = name;
    
    greeting
  }
}
