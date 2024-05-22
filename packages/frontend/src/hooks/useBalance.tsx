import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { useEffect } from 'react'
import { formatAmount } from '~~/helpers/misc'

const DEFAULT_REFETCH_INTERVAL = 3000

export interface IUseBalanceParams {
  /**
   * Whether the balance needs to be refreshed regularly or just once.
   */
  autoRefetch?: boolean
  /**
   * Auto refetch interval in milliseconds.
   */
  autoRefetchInterval?: number
}
export interface IUseBalanceResponse {
  /**
   * Decimally formatted SUI balance.
   */
  balance: string | undefined
  error: Error | null
  refetch: () => void
}

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
