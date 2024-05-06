// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting {

  // === Imports ===

  // use std::debug;
  use sui::event::emit;

  // === Constants ===

  // === Errors ===

  const ENotOwned: u64 = 1;
  const EEmptyName: u64 = 2;

  // === Structs ===

  public struct Greeting has key {
    id: UID,
    owner: address,
    name: vector<u8>,
  }

  // === Events ===

  /// Emitted when the net is set.
  public struct EventNameSet has copy, drop {
    greeting_id: ID,
    old_name: vector<u8>,
    new_name: vector<u8>
  }

  // === Initializer ===

  #[allow(lint(share_owned))]
  /// Create and share a Greeting object.
  public fun create(ctx: &mut TxContext) {
    // Create the Greeting object.
    let greeting = new(ctx);

    // Share the Greeting object with everyone.
    transfer::share_object(greeting);
  }

  // === Public-Mutative Functions ===

  /// Sets the name of currently greeted person.
  public fun set_name(self: &mut Greeting, name: vector<u8>, ctx: &TxContext) {
    assert!(self.owner == ctx.sender(), ENotOwned);
    assert!(name.length() > 0, EEmptyName);

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

  /// Returns the Greeting owner. 
  public fun owner(self: &Greeting): address {
    self.owner
  }

  /// Returns the name of currently greeted person.
  public fun name(self: &Greeting): vector<u8> {
    self.name
  }

  // === Private Functions ===

  fun new(ctx: &mut TxContext): Greeting {
    Greeting {
      id: object::new(ctx),
      owner: ctx.sender(),
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
