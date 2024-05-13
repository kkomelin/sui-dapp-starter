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

export const useReset = ({ onSuccess, onError }: IParams) => {
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)

  const { transact } = useTransact({
    functionName: fullFunctionName(packageId, 'reset_greeting'),
    onSuccess,
    onError,
  })

  return { reset: transact }
}

export default useReset
