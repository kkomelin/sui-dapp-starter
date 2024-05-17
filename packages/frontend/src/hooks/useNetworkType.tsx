import { formatNetworkType } from '@/helpers/networks'
import { useCurrentWallet } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'

const DEFAULT_REFETCH_INTERVAL = 3000

export type NetworkType = 'localnet' | 'devnet' | 'testnet' | 'mainnet'

export interface IUseNetworkTypeParams {
  /**
   * Whether the balance needs to be refreshed regularly or just once.
   */
  autoRefetch?: boolean
  /**
   * Auto refetch interval in milliseconds.
   */
  autoRefetchInterval?: number
}
export interface IUseNetworkTypeResponse {
  /**
   * Network type or undefined if wallet is not connected.
   */
  networkType: NetworkType | undefined
  refetch: () => void
}

const useNetworkType = ({
  autoRefetch,
  autoRefetchInterval,
}: IUseNetworkTypeParams): IUseNetworkTypeResponse => {
  const wallet = useCurrentWallet()
  const [networkType, setNetworkType] = useState<NetworkType>()

  // @todo Find a better type for the wallet.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const connectionStatusCheck = (wallet: any) => {
    if (!wallet.isConnected) {
      setNetworkType(undefined)
      return
    }

    setNetworkType(
      formatNetworkType(wallet.currentWallet?.accounts?.[0].chains?.[0]) as
        | NetworkType
        | undefined
    )
    console.debug('debug: Network type refetched')
  }

  useEffect(() => {
    connectionStatusCheck(wallet)

    if (autoRefetch == null || autoRefetch === false) {
      return
    }

    const interval = setInterval(
      () => {
        if (!wallet.isConnected || !autoRefetch) {
          console.debug('debug: Network type refetching stopped')
          setNetworkType(undefined)
          clearInterval(interval)
          return
        }

        connectionStatusCheck(wallet)
      },
      autoRefetch && autoRefetchInterval != null
        ? autoRefetchInterval
        : DEFAULT_REFETCH_INTERVAL
    )
    return () => {
      clearTimeout(interval)
    }
  }, [autoRefetch, autoRefetchInterval, wallet])

  return {
    networkType,
    refetch: () => connectionStatusCheck(wallet),
  }
}

export default useNetworkType
