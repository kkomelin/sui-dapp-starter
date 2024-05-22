import {
  SuiClientProviderContext,
  useCurrentWallet,
  useSuiClientContext,
} from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { formatNetworkType } from '~~/helpers/networks'
import { ENetwork } from '~~/types/ENetwork'

const DEFAULT_REFETCH_INTERVAL = 3000

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
  networkType: ENetwork | undefined
  refetch: () => void
}

const useNetworkType = ({
  autoRefetch,
  autoRefetchInterval,
}: IUseNetworkTypeParams = {}): IUseNetworkTypeResponse => {
  const wallet = useCurrentWallet()
  const ctx = useSuiClientContext()
  const [networkType, setNetworkType] = useState<ENetwork | undefined>()

  // @todo Find a better type for the wallet.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const connectionStatusCheck = (
    wallet: any,
    ctx: SuiClientProviderContext
  ) => {
    if (!wallet.isConnected) {
      setNetworkType(undefined)
      return
    }

    const newNetwork = formatNetworkType(
      wallet.currentWallet?.accounts?.[0].chains?.[0]
    ) as ENetwork | undefined

    // This is currently selected wallet network.
    setNetworkType(newNetwork)

    // And this is current app network.
    if (newNetwork != null) {
      ctx.selectNetwork(newNetwork)
    }

    console.debug('debug: Network type refetched')
  }

  useEffect(() => {
    connectionStatusCheck(wallet, ctx)

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

        connectionStatusCheck(wallet, ctx)
      },
      autoRefetch && autoRefetchInterval != null
        ? autoRefetchInterval
        : DEFAULT_REFETCH_INTERVAL
    )
    return () => {
      clearTimeout(interval)
    }
  }, [autoRefetch, autoRefetchInterval, wallet, ctx])

  return {
    networkType: networkType as ENetwork | undefined,
    refetch: () => connectionStatusCheck(wallet, ctx),
  }
}

export default useNetworkType
