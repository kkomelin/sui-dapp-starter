import { useConnectWallet, useWallets } from '@mysten/dapp-kit'
import { Button } from '@radix-ui/themes'

const CustomConnectButton = () => {
  const wallets = useWallets()
  const { mutate: connect } = useConnectWallet()

  return (
    <ul className="text-center">
      {wallets.map((wallet) => (
        <li key={wallet.name} className="py-1">
          <Button
            variant="solid"
            size="4"
            onClick={() => {
              connect({ wallet }, { onSuccess: () => console.log('connected') })
            }}
          >
            Connect to {wallet.name}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default CustomConnectButton
