// Copyright (c) Konstantin Komelin and sui-dapp-starter contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting {
  // Imports:

  // Constants:
  const DEFAULT_GREETING: vector<u8> = b"Hello, World!";

  // Errors:
  // const EInvalidSomething: u8 = 10;

  // Struct definitions:
  public struct Greeting has key, store {
    id: UID,
    message: vector<u8>,
  }

  // Events:
  // public struct GreetingCreatedEvent has copy, drop {
  //   greeting_id: ID,
  // }

   /// Create and share a Greeting object.
  public fun create(ctx: &mut TxContext) {
    // Creating the Greeting object.
    let greeting = Greeting {
        id: object::new(ctx),
        message: DEFAULT_GREETING
    };

    // Sharing the Greeting object with the sender.
    transfer::share_object(greeting);
  }
}
