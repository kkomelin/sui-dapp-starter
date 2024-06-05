import { getFaucetHost, requestSuiFromFaucetV1 } from '@mysten/sui/faucet'
import { ENetworksWithFaucet } from '~~/types/ENetworksWithFaucet'

export const fundAddress = async (
  address: string,
  network: ENetworksWithFaucet
) => {
  return await requestSuiFromFaucetV1({
    host: getFaucetHost(network),
    recipient: address,
  })
}
