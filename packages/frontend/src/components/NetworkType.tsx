import { Badge } from '@radix-ui/themes'
import useSynchronizedNetworkType from '~~/hooks/useSynchronizedNetworkType'

const NetworkType = () => {
  const { networkType } = useSynchronizedNetworkType({ autoSync: true })

  let color = 'amber'
  if (networkType == null) {
    color = 'tomato'
  } else if (networkType === 'mainnet') {
    color = 'green'
  }

  // @todo Suggest Radix adding a better type for the color.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <Badge color={color as any} className="rounded-lg px-3 py-1.5">
      {networkType || 'disconnected'}
    </Badge>
  )
}

export default NetworkType
