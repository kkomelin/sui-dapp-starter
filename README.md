# sui-dapp-starter

Better full-stack Sui dapp starter

## Motivation

I took the [official Sui e2e starter template](https://github.com/MystenLabs/sui/tree/main/sdk/create-dapp) and tried to develop with it. 
It's a good starting point and it just works but it's also very basic. 

While working with the official starter, I came up with a [list of DX improvements](https://github.com/kkomelin/sui-dapp-starter/wiki), which I decided to wrap into a separate starter template.

## Prerequisites

Before you begin, you need to install the following:

**Backend:**
- [Sui prerequisites](https://docs.sui.io/build/install#prerequisites) (Sui prerequisites only; not Sui binaries themselves)
- [Suibase](https://suibase.io/how-to/install.html)

**Frontend:**
- [Node (>= v20)](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [Git](https://git-scm.com/downloads)

## Installation

[Use the template on Github ->](https://github.com/new?template_name=sui-dapp-starter&template_owner=kkomelin)

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

Run the frontend app:
```bash
pnpm dev
```

More commands in [package.json](https://github.com/kkomelin/sui-dapp-starter/blob/main/package.json)

## Testing

```bash
pnpm test
```

_Currently we have blockchain tests only._
