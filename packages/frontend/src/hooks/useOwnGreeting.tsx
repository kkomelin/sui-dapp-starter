import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  useNetworkVariable,
} from '@/config/networks'
import { fullStructName } from '@/helpers/greeting/misc'
import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'

const useOwnGreeting = () => {
  const currentAccount = useCurrentAccount()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)

  return useSuiClientQuery('getOwnedObjects', {
    owner: currentAccount?.address as string,
    limit: 1,
    filter: {
      StructType: fullStructName(packageId, 'Greeting'),
    },
    options: {
      showContent: true,
    },
  })
}

export default useOwnGreeting
