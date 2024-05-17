import { formatAmount } from '@/helpers/misc'
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { useEffect } from 'react'

const BALANCE_REQUEST_DELAY = 3000

const useBalance = () => {
  const currentAccount = useCurrentAccount()
  const { data, refetch } = useSuiClientQuery('getBalance', {
    owner: currentAccount?.address as string,
  })

  useEffect(() => {
    const interval = setInterval(refetch, BALANCE_REQUEST_DELAY)
    return () => {
      clearTimeout(interval)
    }
  }, [])

  return { balance: data ? formatAmount(data.totalBalance) : undefined }
}

export default useBalance
