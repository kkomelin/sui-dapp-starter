import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet'
import { ENetworksWithFaucet } from '~~/types/ENetworksWithFaucet'

export const fundAddress = async (
  address: string,
  network: ENetworksWithFaucet
) => {
  return await requestSuiFromFaucetV0({
    host: getFaucetHost(network),
    recipient: address,
  })
}
