import { Button } from '@radix-ui/themes'
import { HandCoinsIcon } from 'lucide-react'
import useFaucet from '~~/hooks/useFaucet'

const Faucet = () => {
  const { fund } = useFaucet()

  return (
    <Button
      variant="surface"
      className="cursor-pointer rounded-lg px-3 py-1.5"
      onClick={() => fund()}
    >
      <HandCoinsIcon />
      Faucet
    </Button>
  )
}

export default Faucet
