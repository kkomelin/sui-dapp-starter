import { createNetworkConfig } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";

export const LOCALNET_CONTRACT_PACKAGE_ID = "0xTODO";
export const DEVNET_CONTRACT_PACKAGE_ID = "0xTODO";
export const MAINNET_CONTRACT_PACKAGE_ID = "0xTODO";

export const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    localnet: {
      url: getFullnodeUrl("localnet"),
      variables: {
        contractPackageId: LOCALNET_CONTRACT_PACKAGE_ID,
      },
    },
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        contractPackageId: DEVNET_CONTRACT_PACKAGE_ID,
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        contractPackageId: MAINNET_CONTRACT_PACKAGE_ID,
      },
    },
  });
