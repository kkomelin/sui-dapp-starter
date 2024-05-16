import useNetworkConfig from '@/hooks/useNetworkConfig'
import { ENetwork } from '@/types/ENetwork'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'

const queryClient = new QueryClient()

const SuiProvider: FC<PropsWithChildren> = ({ children }) => {
  const { networkConfig } = useNetworkConfig()
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork={ENetwork.LOCALNET}
      >
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

export default SuiProvider
