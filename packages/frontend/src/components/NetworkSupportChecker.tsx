import { useCurrentAccount } from '@mysten/dapp-kit'
import { isNetworkSupported, supportedNetworks } from '~~/helpers/networks'
import useNetworkType from '~~/hooks/useNetworkType'

const NetworkSupportChecker = () => {
  const { networkType } = useNetworkType()
  const currentAccount = useCurrentAccount()

  const okNetworks = supportedNetworks()

  if (currentAccount == null) {
    return <></>
  }

  if (okNetworks.length === 0) {
    return (
      <div className="m-2 mx-auto w-full max-w-lg rounded border border-red-400 px-3 py-2 text-center text-red-400">
        No deployed contracts found. Please contact support.
      </div>
    )
  }

  if (networkType == null || isNetworkSupported(networkType)) {
    return <></>
  }

  return (
    <div className="m-2 mx-auto w-full max-w-lg rounded border border-red-400 px-3 py-2 text-center text-red-400">
      The <span className="font-bold">{networkType}</span> is not currently
      supported by the app.
      <br />
      Please switch to a supported network [
      <span className="font-bold">{okNetworks.join(', ')}</span>] in your wallet
      settings.
    </div>
  )
}

export default NetworkSupportChecker
