# Sui dApp Starter - Full-Stack Sui Starter on Steroids
[![Build and Lint (frontend)](https://github.com/kkomelin/sui-dapp-starter/actions/workflows/build_and_lint.yaml/badge.svg)](https://github.com/kkomelin/sui-dapp-starter/actions/workflows/build_and_lint.yaml)
[![Discord chat](https://img.shields.io/discord/1237259509366521866.svg?logo=discord&style=flat-square)](https://discord.com/invite/HuDPpXz4Hx)

![Spoiler](https://repository-images.githubusercontent.com/794883099/f0937c6b-c021-41db-b44a-a287b29111c3)

## Motivation

The official [e2e Sui starter template](https://github.com/MystenLabs/sui/tree/main/sdk/create-dapp) is a good starting point but it's very basic. While working with it, I came up with a list of [DX improvements](https://github.com/kkomelin/sui-dapp-starter/wiki), which I ended up wrapping into a separate starter template. And here it is.

## Features

- **[Suibase](https://suibase.io/)**: Painless work with the local network
- **[Local Sui Explorer](https://github.com/kkomelin/sui-explorer-local)**: Browse your transactions and objects locally
- **pnpm**: More efficient package management for monorepos
- **TypeScript**: Less error-prone JavaScript
- **React**: Good old React for truly decentralized apps
- **Tailwind CSS**: Utility-first CSS for more efficient styling
- **Vite + SWC**: Faster app bundling and optimizing
- **Radix UI**: Accessible React components to prototype quicker 
- **Sui dApp Kit**: All you need to work with Sui network on frontend
- **On-Chain Randomness**: On-Chain Randomness example (currently on localnet/devnet only) 
- **Frontend Deployment Preconfigured**: Firebase deployment commands and configuration [provided](https://github.com/kkomelin/sui-dapp-starter/wiki/Frontend:-Deployment-to-Firebase)

## Prerequisites

Before you begin, install the following:

- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only; not Sui binaries themselves)
- [Suibase](https://suibase.io/how-to/install.html)
- [Docker](https://docs.docker.com/engine/install/)
- [Node (>= 20)](https://nodejs.org/en/download/)
- [pnpm (>= 9)](https://pnpm.io/installation)

## Installation

#### 1. Get the starter

[Use this template](https://github.com/new?template_name=sui-dapp-starter&template_owner=kkomelin&name=my-first-sui-dapp) to create a new Github project based on the starter.

#### 2. Clone the newly created project to your local machine

```bash
git clone https://github.com/[your github nickname]/[your new project name].git
cd [your new project name]
```

#### 3. Install dependencies

```bash
pnpm install
```

## Usage

#### 1. Run the local Sui network:

```bash
pnpm localnet:start
```

Local Sui Explorer will be available on [http://localhost:9001/](http://localhost:9001/)

#### 2. Deploy the demo contract to the local network:

```bash
pnpm localnet:deploy
```

#### 3. Fund your localnet account via Sui Wallet or the faucet:

```bash
pnpm localnet:faucet 0xYOURADDRESS
```

#### 4. Run the app:

```bash
pnpm start
```

More commands in [package.json](https://github.com/kkomelin/sui-dapp-starter/blob/main/package.json)

## Deployment (frontend)

Follow [this guide](https://github.com/kkomelin/sui-dapp-starter/wiki/Frontend:-Deployment-to-Firebase) to deploy the frontend app to Firebase.

## Test

```bash
pnpm test
```

_Currently we have blockchain tests only._

## Troubleshoot

If you have any issue with the starter, first try to find it in the [Troubleshooting section](https://github.com/kkomelin/sui-dapp-starter/wiki/Troubleshooting) on Wiki,
then check our [issue queue](https://github.com/kkomelin/sui-dapp-starter/issues) for similar issues.
If nothing found, please [create a new issue](https://github.com/kkomelin/sui-dapp-starter/issues/new) and ask for help on [Discord](https://discord.com/invite/HuDPpXz4Hx).

## Roadmap

See the list of ideas for future improvement on our [Wiki](https://github.com/kkomelin/sui-dapp-starter/wiki).

## Community

[Join our Discord](https://discord.com/invite/HuDPpXz4Hx)  

## Links

- [Sui: Developers: Docs, tools and courses](https://sui.io/developers)
- [Sui: Code Conventions](https://docs.sui.io/concepts/sui-move-concepts/conventions)
- [Move Book](https://move-book.com/)
- [Suibase Docs](https://suibase.io/intro.html)
- [@mysten/create-dapp - official starter](https://www.npmjs.com/package/@mysten/create-dapp)
