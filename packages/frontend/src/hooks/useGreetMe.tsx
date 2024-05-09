import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  useNetworkVariable,
} from '@/config/networks'
import { fullFunctionName } from '@/helpers/greeting'
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client'
import useTransact from './useTransact'

interface IParams {
  onSuccess: (response: SuiTransactionBlockResponse) => void
  onError?: (e: Error) => void
}

export const useGreetMe = ({ onSuccess, onError }: IParams) => {
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)

  const { transact } = useTransact({
    functionName: fullFunctionName(packageId, 'set_name'),
    onSuccess,
    onError,
  })

  return { greetMe: transact }
}

export default useGreetMe
