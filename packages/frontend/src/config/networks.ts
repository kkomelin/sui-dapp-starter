import { getNetworkConfig } from '@/helpers/networks'

// For localnet, we automatically create .env.local after deployment with the deployed package ID.
export const LOCALNET_CONTRACT_PACKAGE_ID =
  import.meta.env.VITE_CONTRACT_PACKAGE_ID || '0xTODO'
export const DEVNET_CONTRACT_PACKAGE_ID = '0xTODO'
export const TESTNET_CONTRACT_PACKAGE_ID = '0xTODO'
export const MAINNET_CONTRACT_PACKAGE_ID = '0xTODO'

export const LOCALNET_EXPLORER_URL = 'http://localhost:9001'
export const DEVNET_EXPLORER_URL = 'https://devnet.suivision.xyz'
export const TESTNET_EXPLORER_URL = 'https://testnet.suivision.xyz'
export const MAINNET_EXPLORER_URL = 'https://suivision.xyz'

export const CONTRACT_PACKAGE_VARIABLE_NAME = 'contractPackageId'
export const CONTRACT_MODULE_NAME = 'greeting'

export const EXPLORER_URL_VARIABLE_NAME = 'explorerUrl'

export const { networkConfig, useNetworkVariable, useNetworkVariables } =
  getNetworkConfig()
