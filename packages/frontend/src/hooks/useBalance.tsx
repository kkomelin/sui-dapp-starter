import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { useEffect } from 'react'
import { formatAmount } from '~~/helpers/misc'

const DEFAULT_REFETCH_INTERVAL = 3000

export interface IUseBalanceParams {
  /**
   * (Optional) The flag determines whether the balance needs to be refreshed regularly or just once.
   */
  autoRefetch?: boolean
  /**
   * (Optional) Auto refetch interval in milliseconds.
   */
  autoRefetchInterval?: number
}
export interface IUseBalanceResponse {
  /**
   * Decimally formatted SUI balance.
   */
  balance: string | undefined
  error: Error | null
  /**
   * Refetch the balance.
   */
  refetch: () => void
}

/**
 * The `useBalance()` hook lets you request SUI balance for current user address on the currently active network.
 * 
 * It's possible to request the balance once or on a regular basis.
 * 
 * Usage:
 * - One-time request
 * ```ts
 * const { balance } = useBalance({ 
 *   autoRefetch: false 
 * })
 * ```
 * - On demand
 * ```ts
 * const { balance, error, refetch } = useBalance()
 * refetch()
 * ```
 * - Regular update
 * ```ts
 * const { balance } = useBalance({ 
 *   autoRefetch: true, 
 *   autoRefetchInterval: 3000
 * })
 * ```
 * 
 * Where `autoRefetchInterval` is in milliseconds. Default value is 3000 milliseconds (3 seconds).
 * 
 * @param {IUseBalanceParams} params The parameter object.
 * @returns {IUseBalanceResponse} An object with the balance, error and refetch function.
 */
const useBalance = ({
  autoRefetch,
  autoRefetchInterval,
}: IUseBalanceParams = {}): IUseBalanceResponse => {
  const currentAccount = useCurrentAccount()
  const { data, refetch, error } = useSuiClientQuery('getBalance', {
    owner: currentAccount?.address as string,
  })

  useEffect(() => {
    if (autoRefetch == null || autoRefetch === false) {
      return
    }

    const interval = setInterval(
      () => {
        if (currentAccount == null || !autoRefetch) {
          console.debug('debug: Balance refetching stopped')
          clearInterval(interval)
          return
        }

        refetch()
        console.debug('debug: Balance refetched')
      },
      autoRefetch && autoRefetchInterval != null
        ? autoRefetchInterval
        : DEFAULT_REFETCH_INTERVAL
    )

    return () => {
      clearTimeout(interval)
    }
  }, [refetch, autoRefetch, autoRefetchInterval, currentAccount])

  return {
    balance: data ? formatAmount(data.totalBalance) : undefined,
    error,
    refetch: async () => {
      refetch()
      console.debug('debug: Balance refetched')
    },
  }
}

export default useBalance
