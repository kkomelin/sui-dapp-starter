import { Link } from '@radix-ui/themes'
import { HeartIcon, SearchIcon } from 'lucide-react'
import Faucet from '~~/components/Faucet'
import ThemeSwitcher from '~~/components/ThemeSwitcher'
import { EXPLORER_URL_VARIABLE_NAME } from '~~/config/networks'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

const Footer = () => {
  const { useNetworkVariable } = useNetworkConfig()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)
  

  return (
    <footer className="flex w-full flex-col flex-wrap items-center justify-between gap-3 p-3 px-3 py-3 sm:flex-row">
      <div className="flex flex-row gap-3 lg:w-1/3">
        <Faucet />
        <Link
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center gap-1"
          highContrast={true}
        >
          <SearchIcon className="h-4 w-4" />
          <span>Block Explorer</span>
        </Link>
      </div>

      <div className="flex flex-grow flex-row items-center justify-center gap-1">
        <span>Built with</span>
        <HeartIcon className="h-4 w-4" />
        <span>by</span>
        <Link
          href="https://github.com/kkomelin"
          target="_blank"
          rel="noopener noreferrer"
          highContrast={true}
        >
          @kkomelin
        </Link>
        <span>·</span>
        <Link
          href="https://github.com/kkomelin/sui-dapp-starter/issues/new"
          target="_blank"
          rel="noopener noreferrer"
          highContrast={true}
        >
          Support
        </Link>
      </div>

      <div className="flex flex-row justify-end lg:w-1/3">
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
export default Footer
