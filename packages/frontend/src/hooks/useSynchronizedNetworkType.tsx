import {
  SuiClientProviderContext,
  useCurrentWallet,
  useSuiClientContext,
} from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { formatNetworkType } from '~~/helpers/networks'
import { ENetwork } from '~~/types/ENetwork'

const DEFAULT_REFETCH_INTERVAL = 3000

export interface IUseSynchronizedNetworkTypeParams {
  /**
   * Whether the balance needs to be refreshed regularly or just once.
   */
  autoRefetch?: boolean
  /**
   * Auto refetch interval in milliseconds.
   */
  autoRefetchInterval?: number
}
export interface IUseSynchronizedNetworkTypeResponse {
  /**
   * Network type or undefined if wallet is not connected.
   */
  networkType: ENetwork | undefined
  synchronize: () => void
}

const useSynchronizedNetworkType = ({
  autoRefetch,
  autoRefetchInterval,
}: IUseSynchronizedNetworkTypeParams = {}): IUseSynchronizedNetworkTypeResponse => {
  const wallet = useCurrentWallet()
  const ctx = useSuiClientContext()
  const [networkType, setNetworkType] = useState<ENetwork | undefined>()

  // @todo Find a better type for the wallet.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const synchronizeNetworkType = (wallet: any, ctx: SuiClientProviderContext) => {
    if (!wallet.isConnected) {
      setNetworkType(undefined)
      return
    }

    const newNetwork = formatNetworkType(
      wallet.currentWallet?.accounts?.[0].chains?.[0]
    ) as ENetwork | undefined

    // Save currently selected wallet network.
    setNetworkType(newNetwork)

    // If network is defined, set the app network to it.
    if (newNetwork != null) {
      ctx.selectNetwork(newNetwork)
    }

    console.debug('debug: Network type synchronized')
  }

  useEffect(() => {
    synchronizeNetworkType(wallet, ctx)

    if (autoRefetch == null || autoRefetch === false) {
      return
    }

    const interval = setInterval(
      () => {
        if (!wallet.isConnected || !autoRefetch) {
          console.debug('debug: Network type synchronizing stopped')
          setNetworkType(undefined)
          clearInterval(interval)
          return
        }

        synchronizeNetworkType(wallet, ctx)
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
    synchronize: () => synchronizeNetworkType(wallet, ctx),
  }
}

export default useSynchronizedNetworkType
