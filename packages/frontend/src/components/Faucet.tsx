import { Button } from '@radix-ui/themes'
import { HandCoinsIcon } from 'lucide-react'
import useFaucet from '~~/hooks/useFaucet'

/**
 * The `Faucet` component renders a button that lets user fund their current address on the currently selected test network.
 * 
 * The supported networks are **localnet**, **devnet** and **testnet**.
 * The granted amount is:
 * - localnet: 100 SUI
 * - devnet: 10 SUI
 * - testnet: 1 SUI
 * Please note there is a certain quota for requesting funds from **devnet** and **testnet**. 
 * If you have reached the limit, wait for 24 hours, and in the meanwhile use the `#devnet-faucet` and `#testnet-faucet` channels 
 * of the official Sui Discord https://discord.gg/sui
 * 
 * The component is using the useFaucet hook to fund the current address.
 */
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
