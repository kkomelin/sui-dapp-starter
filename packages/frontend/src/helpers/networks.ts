import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
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
        [CONTRACT_PACKAGE_VARIABLE_NAME]: LOCALNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.DEVNET]: {
      url: getFullnodeUrl(ENetwork.DEVNET),
      variables: {
        [CONTRACT_PACKAGE_VARIABLE_NAME]: DEVNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.TESTNET]: {
      url: getFullnodeUrl(ENetwork.TESTNET),
      variables: {
        [CONTRACT_PACKAGE_VARIABLE_NAME]: TESTNET_CONTRACT_PACKAGE_ID,
      },
    },
    [ENetwork.MAINNET]: {
      url: getFullnodeUrl(ENetwork.MAINNET),
      variables: {
        [CONTRACT_PACKAGE_VARIABLE_NAME]: MAINNET_CONTRACT_PACKAGE_ID,
      },
    },
  })
}
