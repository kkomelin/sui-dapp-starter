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
   * Whether the app network needs to be synchronized with the wallet network regularly or just once.
   */
  autoSync?: boolean
  /**
   * Auto sync interval in milliseconds.
   */
  autoSyncInterval?: number
}
export interface IUseSynchronizedNetworkTypeResponse {
  /**
   * Network type or undefined if wallet is not connected.
   */
  networkType: ENetwork | undefined
  /**
   * Synchronize app network with wallet network on demand.
   * @returns
   */
  synchronize: () => void
}

const useSynchronizedNetworkType = ({
  autoSync,
  autoSyncInterval,
}: IUseSynchronizedNetworkTypeParams = {}): IUseSynchronizedNetworkTypeResponse => {
  const wallet = useCurrentWallet()
  const ctx = useSuiClientContext()
  const [networkType, setNetworkType] = useState<ENetwork | undefined>()

  // @todo Find a better type for the wallet.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const synchronizeNetworkType = (
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

    if (autoSync == null || autoSync === false) {
      return
    }

    const interval = setInterval(
      () => {
        if (!wallet.isConnected || !autoSync) {
          console.debug('debug: Network type synchronizing stopped')
          setNetworkType(undefined)
          clearInterval(interval)
          return
        }

        synchronizeNetworkType(wallet, ctx)
      },
      autoSync && autoSyncInterval != null
        ? autoSyncInterval
        : DEFAULT_REFETCH_INTERVAL
    )
    return () => {
      clearTimeout(interval)
    }
  }, [autoSync, autoSyncInterval, wallet, ctx])

  return {
    networkType: networkType as ENetwork | undefined,
    synchronize: () => synchronizeNetworkType(wallet, ctx),
  }
}

export default useSynchronizedNetworkType
