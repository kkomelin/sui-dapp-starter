// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting {

  // === Imports ===

  // use std::debug;
  use sui::event::emit;
  use sui::random::{Random, new_generator};

  // === Constants ===

  const MaxEmojis: u8 = 63;

  // === Errors ===

  const EEmptyName:u64 = 0;

  // === Structs ===

  public struct Greeting has key {
    id: UID,
    name: vector<u8>,
    emoji: u8
  }

  // === Events ===

  /// Emitted when the greeting is created.
  public struct EventGreetingCreated has copy, drop {
    greeting_id: ID
  }

  /// Emitted when the Greeting is set.
  public struct EventGreetingSet has copy, drop {
    greeting_id: ID
  }

  /// Emitted when the Greeting is reset.
  public struct EventGreetingReset has copy, drop {
    greeting_id: ID
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

  /// Resets the greeting.
  public fun reset_greeting(g: &mut Greeting) {
    g.name = vector::empty<u8>();
    g.emoji = 0;

    let greeting_id = g.id.to_inner();

    emit(EventGreetingReset {
      greeting_id
    });
  }

  // === Public-View Functions ===

  /// Returns the name of currently greeted person.
  public fun name(g: &Greeting): vector<u8> {
    g.name
  }

  /// Returns the emoji of current greeting.
  public fun emoji(g: &Greeting): u8 {
    g.emoji
  }

  // === Private Functions ===

  /// Sets the name of currently greeted person and chooses a random emoji for them.
  ///
  /// The function is defined as private entry to prevent calls from other Move functions. (If calls from other
  /// functions are allowed, the calling function might abort the transaction depending on the winner.)
  /// Gas based attacks are not possible since the gas cost of this function is independent of the winner.
  entry fun set_greeting(g: &mut Greeting, name: vector<u8>, r: &Random, ctx: &mut TxContext) {
    assert!(name != b"", EEmptyName);

    let mut generator = r.new_generator(ctx);
    let emoji = generator.generate_u8_in_range(0, MaxEmojis);

    // debug::print(g);
    g.name = name;
    g.emoji = emoji;
    // debug::print(g);

    let greeting_id = g.id.to_inner();

    emit(EventGreetingSet {
      greeting_id
    });
  }

  /// Create a new empty Greetings object.
  fun new(ctx: &mut TxContext): Greeting {
    Greeting {
      id: object::new(ctx),
      name: vector::empty<u8>(),
      emoji: 0
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

  #[test_only]
  /// Returns the MaxEmojis constant value.
  public fun maxEmojis(): u8 {
    MaxEmojis
  }
}
