import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'

const useOwnGreeting = () => {
  const currentAccount = useCurrentAccount()
  // const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  return useSuiClientQuery('getOwnedObjects', {
    owner: currentAccount?.address as string,
    // filter: {
    //   StructType: `${packageId}::greeting::Greeting`,
    // },
    options: {
      showContent: true,
      // showOwner: true,
    },
  })
}

export default useOwnGreeting
