import { Badge } from '@radix-ui/themes'
import useBalance from '~~/hooks/useBalance'

/**
 * The `Balance` component is used for displaying SUI balance for current user address on the currently active network.
 * 
 * The balance is updated automatically with 3 second interval.
 * Please note the component doesn't display anything if user wallet is not connected.
 * 
 * The component is using the useBalance hook to fetch the balance.
 */
const Balance = () => {
  const { balance } = useBalance({ autoRefetch: true })

  if (balance == null) {
    return <></>
  }

  return (
    <Badge variant="surface" color="green" className="rounded-lg px-3 py-1.5">
      {balance} SUI
    </Badge>
  )
}

export default Balance
