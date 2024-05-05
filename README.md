# [in progress] sui-dapp-starter

Better full-stack Sui dapp starter

## Motivation

I took the [official Sui e2e starter template](https://github.com/MystenLabs/sui/tree/main/sdk/create-dapp) and tried to develop with it. 
It's a good starting point and it just works but it's also very basic. 

While working with the official starter, I came up with a list of DX improvements, which I decided to wrap into a separate starter template.

## Improvements (over the official starter template)

- [x] Implemented a monorepo architecture with pnpm workspaces.
- [x] Added recommenced VSCode plugins through VSCode configuration.
- [x] frontend: Added "@" import alias for the src folder to make the imports cleaner.
- [x] frontend: Refactored the main code entry file by introducing reactRender() function.
- [x] frontend: Created SuiProvider which encapsulates all Sui-related providers.
- [x] frontend: Added Tailwind CSS with auto-ordering Tailwind classes through Prettier.
- [x] frontend: Added opinionated Prettier configuration.
- [x] frontend: Added configuration for localnet and testnet.
- [x] docs: Added Prerequisites section to README.
- [x] backend: Added local network management commands via Suibase.

## Prerequisites

Before you begin, you need to install the following:

Backend:
- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites). _Skip installing the Sui binaries (unless you have an application that depends on ~/.sui/sui_config)_
- [Suibase](https://suibase.io/how-to/install.html)

Frontend:
- [Node (>= v20)](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)

## Install

```bash
pnpm dlx degit kkomelin/sui-dapp-starter my-first-sui-dapp
cd my-first-sui-dapp
pnpm i
```

## Usage

```bash
pnpm localnet:start
pnpm localnet:deploy
pnpm dev
```
