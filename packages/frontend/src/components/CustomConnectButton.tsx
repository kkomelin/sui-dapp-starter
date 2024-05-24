import { ConnectModal, useCurrentAccount, useWallets } from '@mysten/dapp-kit'
import { Button, Link } from '@radix-ui/themes'
import { SUI_WALLET_URL } from '~~/config/misc'

const CustomConnectButton = () => {
  const wallets = useWallets()
  const currentAccount = useCurrentAccount()

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
    <ConnectModal
      trigger={
        <Button disabled={currentAccount != null} variant="solid" size="4">
          {currentAccount ? 'Wallet Connected' : 'Connect Wallet'}
        </Button>
      }
    />
  )
}

export default CustomConnectButton
