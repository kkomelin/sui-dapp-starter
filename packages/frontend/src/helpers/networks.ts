import { CONTRACT_PACKAGE_ID_NOT_DEFINED } from '~~/config/networks'
import { ENetwork } from '~~/types/ENetwork'

export const transactionUrl = (explorerUrl: string, txDigest: string) => {
  return `${explorerUrl}/txblock/${txDigest}`
}

export const formatNetworkType = (machineName: string) => {
  if (machineName.startsWith('sui:')) {
    return machineName.substring(4)
  }
  return machineName
}

export const supportedNetworks = () => {
  const keys = Object.keys(ENetwork)

  return (
    keys
      .filter(
        (key: string) =>
          import.meta.env[`VITE_${key.toUpperCase()}_CONTRACT_PACKAGE_ID`] !=
            null &&
          import.meta.env[`VITE_${key.toUpperCase()}_CONTRACT_PACKAGE_ID`] !==
            CONTRACT_PACKAGE_ID_NOT_DEFINED
      )
      // @ts-expect-error Hard to type cast string->ENetwork here.
      .map((key: string) => ENetwork[key as ENetwork])
  )
}

export const isNetworkSupported = (network: ENetwork | undefined) => {
  return supportedNetworks().includes(network)
}
