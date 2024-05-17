import useBalance from '@/hooks/useBalance'
import { Badge } from '@radix-ui/themes'

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
