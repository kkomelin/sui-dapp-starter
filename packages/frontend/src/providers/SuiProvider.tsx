import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'
import { darkTheme, lightTheme } from '~~/config/themes'
import useNetworkConfig from '~~/hooks/useNetworkConfig'
import { ENetwork } from '~~/types/ENetwork'

const queryClient = new QueryClient()

const SuiProvider: FC<PropsWithChildren> = ({ children }) => {
  const { networkConfig } = useNetworkConfig()

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork={ENetwork.LOCALNET}
      >
        <WalletProvider
          autoConnect={false}
          theme={[
            {
              // Default to light theme.
              variables: lightTheme,
            },
            {
              // React to the color scheme media query.
              mediaQuery: '(prefers-color-scheme: dark)',
              variables: darkTheme,
            },
            {
              // Reacts to the dark class.
              selector: '.dark',
              variables: darkTheme,
            },
          ]}
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

export default SuiProvider
