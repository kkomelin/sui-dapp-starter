import { useConnectWallet, useWallets } from '@mysten/dapp-kit'
import { Button, Link } from '@radix-ui/themes'
import { SUI_WALLET_URL } from '~~/config/misc'

const CustomConnectButton = () => {
  const wallets = useWallets()
  const { mutate: connect } = useConnectWallet()

  if (wallets != null && wallets.length === 0) {
    return (
      <div className="text-center">
        No Sui Wallet plugin detected. Please{' '}
        <Link href={SUI_WALLET_URL} target="_blank" rel="noopener noreferrer">
          install it
        </Link>{' '}
        and reload the page.
      </div>
    )
  }

  return (
    <ul className="text-center">
      {wallets.map((wallet) => (
        <li key={wallet.name} className="py-1">
          <Button
            variant="solid"
            size="4"
            onClick={() => {
              connect({ wallet })
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
