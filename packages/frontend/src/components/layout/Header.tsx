import { ConnectButton } from '@mysten/dapp-kit'
import { Link } from '@radix-ui/themes'
import Logo from '~~/assets/logo.svg'
import Balance from '~~/components/Balance'
import NetworkType from '~~/components/NetworkType'

const Header = () => {
  return (
    <header className="supports-backdrop-blur:bg-white/60 dark:border-slate-50/1 sticky top-0 z-40 flex w-full flex-row flex-wrap items-center justify-center gap-4 bg-white/95 px-3 py-3 backdrop-blur transition-colors duration-500 sm:justify-between sm:gap-3 lg:z-50 lg:border-b lg:border-slate-900/10 dark:bg-transparent">
      <Link
        href="#"
        className="flex flex-col sm:flex-row items-center justify-center gap-1 text-sds-dark outline-none hover:no-underline dark:text-sds-light"
      >
        <img src={Logo} alt="Logo" className="h-12 w-12" />
        <div className="pt-1 text-xl sm:text-2xl">
          {import.meta.env.VITE_APP_NAME}
        </div>
      </Link>

      <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <div className="flex flex-row items-center justify-center gap-3">
          <Balance />
          <NetworkType />
        </div>

        {/* @todo: Find a way to style the connect button */}
        {/* className="!rounded-full !border !border-red-800 p-10 !px-3 !py-2 !shadow" */}
        <ConnectButton />
      </div>
    </header>
  )
}
export default Header
