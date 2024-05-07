# Sui dApp Starter - Full-Stack Sui Starter on Steroids

[![](https://dcbadge.vercel.app/api/server/HuDPpXz4Hx)](https://discord.com/invite/HuDPpXz4Hx)

## Motivation

The official [e2e Sui starter template](https://github.com/MystenLabs/sui/tree/main/sdk/create-dapp) is a good starting point but it's very basic. While working with it, I came up with a list of [DX improvements](https://github.com/kkomelin/sui-dapp-starter/wiki), which I ended up wrapping into a separate starter template. And here it is.

## Features

- **Suibase**: Painless work with the local network
- **pnpm**: More efficient package management for monorepos
- **TypeScript**: Less error-prone JavaScript
- **React**: Good old React for truly decentralized apps
- **Tailwind CSS**: Utility-first CSS for more efficient styling
- **Vite + SWC**: Faster app bundling and optimizing
- **Radix UI**: Accessible React components to prototype quicker 
- **@mysten/dapp-kit** and **@mysten/sui.js**: All you need to build Sui frontends

## Prerequisites

Before you begin, install the following:

- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only; not Sui binaries themselves)
- [Suibase](https://suibase.io/how-to/install.html)
- [Node (>= v20)](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

## Installation

[![Use this template on Github](https://img.shields.io/badge/use%20this-template-blue?logo=github)](https://github.com/kkomelin/sui-dapp-starter/generate)

or

```bash
pnpm dlx degit kkomelin/sui-dapp-starter my-first-sui-dapp
cd my-first-sui-dapp
pnpm install
```

## Usage

Run the local Sui network:
```bash
pnpm localnet:start
```

Deploy the demo contract to the local network:

```bash
pnpm localnet:deploy
```

Fund your localnet account via Sui Wallet or the faucet:
```bash
pnpm localnet:faucet 0xYOURADDRESS
```

Run the app:
```bash
pnpm start
```

More commands in [package.json](https://github.com/kkomelin/sui-dapp-starter/blob/main/package.json)

## Testing

```bash
pnpm test
```

_Currently we have blockchain tests only._

## Roadmap

- [ ] frontend: Better UI notifications
- [ ] frontend: Develop better Sui Kit, Tailwind and Radix theme integration
- [ ] frontend: Develop Sui-specific UI components
- [ ] frontend: Add Arweave deployment scripts
- [ ] backend: Add a Randomness usage example
- [ ] docs: Develop a landing page
- [ ] docs: Write how-to guides
- [ ] infra: Develop a cli tool for easier project creation
- [ ] infra: Enable Husky and lint-staged for pre-commit
- [ ] infra: Enable Github Actions for linting and testing
- [ ] [YOUR FEATURE](https://github.com/kkomelin/sui-dapp-starter/issues/new)

## Community

[Join our Discord](https://discord.com/invite/HuDPpXz4Hx)

## Links

- [Sui: Code Conventions](https://docs.sui.io/concepts/sui-move-concepts/conventions)
- [Move Book](https://move-book.com/)
- [Suibase Docs](https://suibase.io/intro.html)
- [@mysten/create-dapp - official starter](https://www.npmjs.com/package/@mysten/create-dapp)
