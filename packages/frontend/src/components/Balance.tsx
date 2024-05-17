import useBalance from '@/hooks/useBalance'
import { Badge } from '@radix-ui/themes'

const Balance = () => {
  const { balance } = useBalance()

  return (
    <Badge variant="surface" color="green" className="rounded-lg px-3 py-1.5">
      Balance: {balance ? `${balance} SUI` : 'N/A'}
    </Badge>
  )
}

export default Balance
