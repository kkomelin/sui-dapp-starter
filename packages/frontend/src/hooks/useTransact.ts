import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import type { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { EXPLORER_URL_VARIABLE_NAME } from '~~/config/networks'
import { transactionUrl } from '~~/helpers/networks'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

interface IProps {
  onSuccess?: (data: SuiSignAndExecuteTransactionOutput) => void
  onError?: (e: Error) => void
}

const useTransact = ({ onSuccess, onError }: IProps = {}) => {
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()
  const { useNetworkVariable } = useNetworkConfig()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  const transact = (tx: Transaction) => {
    const notificationId = notification.txLoading()

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onError: (e: Error) => {
          notification.txError(e, null, notificationId)
          if (onError != null) {
            onError(e)
          }
        },
        onSuccess: (data: SuiSignAndExecuteTransactionOutput) => {
          client
            .waitForTransaction({
              digest: data.digest,
            })
            .then(() => {
              notification.txSuccess(
                transactionUrl(explorerUrl, data.digest),
                notificationId
              )
              if (onSuccess != null) {
                onSuccess(data)
              }
            })
        },
      }
    )
  }

  return { transact }
}

export default useTransact
