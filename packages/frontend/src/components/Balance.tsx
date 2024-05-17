import useBalance from '@/hooks/useBalance'
import { Badge } from '@radix-ui/themes'

const Balance = () => {
  const { balance } = useBalance()

  return <Badge>Balance: {balance ? `${balance} SUI` : 'N/A'}</Badge>
}

export default Balance
