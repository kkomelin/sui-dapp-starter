import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit'
import { formatAddress } from '@mysten/sui.js/utils'
import { NETWORKS_WITH_FAUCET } from '~~/config/networks'
import { fundAddress } from '~~/helpers/faucet'
import { notification } from '~~/helpers/notification'
import { ENetworksWithFaucet } from '~~/types/ENetworksWithFaucet'

export interface IUseFaucetResponse {
  fund: (address?: string) => void
}

const useFaucet = (): IUseFaucetResponse => {
  const ctx = useSuiClientContext()
  const currentAccount = useCurrentAccount()

  const fund = async (address?: string) => {
    if (!NETWORKS_WITH_FAUCET.includes(ctx.network)) {
      notification.error(null, 'This network does not have a faucet')
      return
    }

    const fundedAddress = address == null ? currentAccount?.address : undefined
    if (fundedAddress == null) {
      notification.error(null, 'Please connect your wallet first')
      return
    }

    try {
      const { error } = await fundAddress(
        fundedAddress,
        ctx.network as ENetworksWithFaucet
      )
      if (error) {
        notification.error(
          new Error(error),
          'Cannot fund the address on this network at the moment'
        )
      }
    } catch (e) {
      notification.error(e as Error, 'Cannot fund the address')
      return
    }

    notification.success(
      `The ${formatAddress(fundedAddress)} address has been funded successfully`
    )
  }

  return {
    fund,
  }
}

export default useFaucet
