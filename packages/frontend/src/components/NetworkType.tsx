import { useCurrentWallet } from '@mysten/dapp-kit'
import { Badge } from '@radix-ui/themes'
import c from 'clsx'
import { useEffect, useState } from 'react'

const CONNECTION_CHECK_DELAY = 2000

const DISCONNECTED_LABEL = 'disconnected'
const MAINNET_LABEL = 'mainnet'

const NetworkType = () => {
  const wallet = useCurrentWallet()
  const [networkName, setNetworkName] = useState<string>()

  // @todo Find a better type for the wallet.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const connectionStatusCheck = (wallet: any) => {
    if (!wallet.isConnected) {
      setNetworkName(DISCONNECTED_LABEL)
      return
    }

    setNetworkName(
      prepareNetworkName(wallet.currentWallet?.accounts?.[0].chains?.[0])
    )
  }

  useEffect(() => {
    const interval = setInterval(
      () => connectionStatusCheck(wallet),
      CONNECTION_CHECK_DELAY
    )
    return () => {
      clearTimeout(interval)
    }
  }, [wallet])

  useEffect(() => {
    connectionStatusCheck(wallet)
  }, [wallet])

  return (
    <Badge
      className={c(
        'rounded-lg px-3 py-1.5 text-amber-600 shadow',
        { '!text-red-500': networkName === DISCONNECTED_LABEL },
        { '!text-green-500': networkName === MAINNET_LABEL }
      )}
    >
      {networkName}
    </Badge>
  )
}

export default NetworkType

const prepareNetworkName = (machineName: string) => {
  if (machineName.startsWith('sui:')) {
    return machineName.substring(4)
  }
  return machineName
}
