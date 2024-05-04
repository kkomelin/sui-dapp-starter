import {
  DEVNET_CONTRACT_PACKAGE_ID,
  LOCALNET_CONTRACT_PACKAGE_ID,
  MAINNET_CONTRACT_PACKAGE_ID,
  TESTNET_CONTRACT_PACKAGE_ID,
} from '@/config/networks'
import { ENetwork } from '@/types/ENetwork'
import { createNetworkConfig } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui.js/client'

export const getNetworkConfig = () => {
  return createNetworkConfig({
    [ENetwork.LOCALNET]: {
      url: getFullnodeUrl(ENetwork.LOCALNET),
      variables: {
        contractPackageId: LOCALNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.DEVNET]: {
      url: getFullnodeUrl(ENetwork.DEVNET),
      variables: {
        contractPackageId: DEVNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.TESTNET]: {
      url: getFullnodeUrl(ENetwork.TESTNET),
      variables: {
        contractPackageId: TESTNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.MAINNET]: {
      url: getFullnodeUrl(ENetwork.MAINNET),
      variables: {
        contractPackageId: MAINNET_CONTRACT_PACKAGE_ID,
      },
    },
  })
}
