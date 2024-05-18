import { Badge } from '@radix-ui/themes'
import useNetworkType from '~~/hooks/useNetworkType'

const NetworkType = () => {
  const { networkType } = useNetworkType({ autoRefetch: true })

  let color = 'amber'
  if (networkType == null) {
    color = 'tomato'
  } else if (networkType === 'mainnet') {
    color = 'green'
  }

  // @todo Suggest Sui adding a better type for the color.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  return (
    <Badge color={color as any} className="rounded-lg px-3 py-1.5">
      {networkType || 'disconnected'}
    </Badge>
  )
}

export default NetworkType
