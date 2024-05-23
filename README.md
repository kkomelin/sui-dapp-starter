# Sui dApp Starter - Full-Stack Sui Starter on Steroids
[![Build and Lint (frontend)](https://github.com/kkomelin/sui-dapp-starter/actions/workflows/build_and_lint.yaml/badge.svg)](https://github.com/kkomelin/sui-dapp-starter/actions/workflows/build_and_lint.yaml)
[![Discord chat](https://img.shields.io/discord/1237259509366521866.svg?logo=discord&style=flat-square)](https://discord.com/invite/HuDPpXz4Hx)

![Spoiler](https://repository-images.githubusercontent.com/794883099/f0937c6b-c021-41db-b44a-a287b29111c3)

## Motivation

Most of the Sui starters I found were either very basic or aimed for developing frontend-only apps. Thanks to my experience with various full-stack starters and templates, I knew how to do better, so I started this template with the goal of providing all basic tools and components for you to focus on your business logic from day one and not spend weeks on creating your app skeleton.

## Features

- **[Suibase](https://suibase.io/)**: Painless work with the networks
- **[Local Sui Explorer](https://github.com/kkomelin/sui-explorer-local)**: Browse your transactions and objects locally
- **pnpm**: More efficient package management for monorepos
- **TypeScript**: Less error-prone JavaScript
- **React**: Good old React for truly decentralized apps
- **Tailwind CSS**: Utility-first CSS for more efficient styling
- **Vite + SWC**: Faster app bundling and optimizing
- **Radix UI**: Accessible React components to prototype quicker 
- **Sui dApp Kit**: All you need to work with Sui network on frontend
- **On-Chain Randomness**: On-Chain Randomness example
- **Components and Hooks**: useTransact, useNetworkType, NetworkType, useBalance, Balance, useFaucet, Faucet and more
- **Frontend Deployment**: deployment commands for [Firebase](https://sui-dapp-starter.dev/docs/frontend/deployment/firebase)
- **One-liner Install**: Just `pnpm create sui-dapp@latest`

## Prerequisites

Before you begin, install the following:

- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only)
- [Suibase](https://suibase.io/how-to/install.html)
- [Docker](https://docs.docker.com/engine/install/)
- [Node (>= 20)](https://nodejs.org/en/download/)
- [pnpm (>= 9)](https://pnpm.io/installation)

## Installation

**[Use this template ->](https://github.com/new?template_name=sui-dapp-starter&template_owner=kkomelin&name=my-first-sui-dapp)**

or

```bash
pnpm create sui-dapp@latest
```

## Usage

#### 1. Run the local Sui network:

```bash
pnpm localnet:start
```

Local Sui Explorer will be available on [localhost:9001](http://localhost:9001/)

#### 2. Deploy the demo contract to the local network:

```bash
pnpm localnet:deploy
```

#### 3. Switch to the local network in your browser wallet settings.

#### 4. Fund your localnet account/address:

You have a few options here:

a) Use the Faucet button integrated into your wallet (e.g. Sui Wallet).

b) Copy the localnet address from your wallet and run the following in your console:

```bash
pnpm localnet:faucet 0xYOURADDRESS
```

c) Run the app and use the Faucet button in the footer.

#### 5. Run the app:

```bash
pnpm start
```

More commands in [package.json](https://github.com/kkomelin/sui-dapp-starter/blob/main/package.json)

## Deployment (frontend)

Follow [this guide](https://sui-dapp-starter.dev/docs/frontend/deployment/firebase) to deploy the frontend app to Firebase.

## Test

```bash
pnpm test
```

_Currently we have blockchain tests only._

## Troubleshoot

If you have any issue with the starter, first try to find it on the [Troubleshooting](https://sui-dapp-starter.dev/docs/misc/troubleshooting) page on the documentation,
then check our [issue queue](https://github.com/kkomelin/sui-dapp-starter/issues) for similar issues.
If nothing found, please [create a new issue](https://github.com/kkomelin/sui-dapp-starter/issues/new) and ask for help on [Discord](https://discord.com/invite/HuDPpXz4Hx).

## Documentation

The project documentation can be found [here](https://sui-dapp-starter.dev/docs).

## Roadmap

See the list of ideas for future improvement in [our documentation](https://sui-dapp-starter.dev/docs/misc/ideas).

## Community

[Join our Discord](https://discord.com/invite/HuDPpXz4Hx)  

## Links

- [Sui: Developers: Docs, tools and courses](https://sui.io/developers)
- [Sui: Code Conventions](https://docs.sui.io/concepts/sui-move-concepts/conventions)
- [Move Book](https://move-book.com/)
- [Suibase Docs](https://suibase.io/intro.html)
- [@mysten/create-dapp - official starter](https://www.npmjs.com/package/@mysten/create-dapp)
