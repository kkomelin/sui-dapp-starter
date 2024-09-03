import { useCurrentAccount, useSuiClientContext } from '@mysten/dapp-kit'
import { formatAddress } from '@mysten/sui/utils'
import { NETWORKS_WITH_FAUCET } from '~~/config/networks'
import { fundAddress } from '~~/helpers/faucet'
import { notification } from '~~/helpers/notification'
import { ENetworksWithFaucet } from '~~/types/ENetworksWithFaucet'

export interface IUseFaucetResponse {
  /**
   * Funds the address on the test network.
   * @param {string|undefined} address The address to fund. If not provided, the current address is used.
   */
  fund: (address?: string) => void
}

/**
 * The `useFaucet()` hook lets you fund an address an a test network.
 * 
 * The supported networks are **localnet**, **devnet** and **testnet**.
 * The granted amount is:
 * - localnet: 100 SUI
 * - devnet: 10 SUI
 * - testnet: 1 SUI
 * Please note there is a quota for requesting funds from **devnet** and **testnet**. 
 * If you have reached the limit, wait for 24 hours, and in the meanwhile use the `#devnet-faucet` and `#testnet-faucet` channels 
 * of the official Sui Discord https://discord.gg/sui.

 * @returns {IUseFaucetResponse} An object with the fund function.
 */
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
