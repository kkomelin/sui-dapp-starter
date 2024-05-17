import { formatNetworkType } from '@/helpers/networks'
import { useCurrentWallet } from '@mysten/dapp-kit'
import { Badge } from '@radix-ui/themes'
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
      formatNetworkType(wallet.currentWallet?.accounts?.[0].chains?.[0])
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

  let color = 'amber'
  if (networkName === DISCONNECTED_LABEL) {
    color = 'tomato'
  } else if (networkName === MAINNET_LABEL) {
    color = 'green'
  }

  // @todo Suggest Sui adding a better type for the color.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <Badge color={color as any} className="rounded-lg px-3 py-1.5">
      {networkName}
    </Badge>
  )
}

export default NetworkType
