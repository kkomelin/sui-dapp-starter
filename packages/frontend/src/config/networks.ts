import { getNetworkConfig } from '@/helpers/networks'

export const LOCALNET_CONTRACT_PACKAGE_ID = '0xTODO'
export const DEVNET_CONTRACT_PACKAGE_ID = '0xTODO'
export const TESTNET_CONTRACT_PACKAGE_ID = '0xTODO'
export const MAINNET_CONTRACT_PACKAGE_ID = '0xTODO'

export const CONTRACT_PACKAGE_VARIABLE_NAME = 'contractPackageId'

export const { networkConfig, useNetworkVariable, useNetworkVariables } =
  getNetworkConfig()
