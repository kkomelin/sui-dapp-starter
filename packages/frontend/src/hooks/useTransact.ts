import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit'
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { EXPLORER_URL_VARIABLE_NAME } from '~~/config/networks'
import { transactionUrl } from '~~/helpers/networks'
import { notification } from '~~/helpers/notification'
import useNetworkConfig from '~~/hooks/useNetworkConfig'

interface IProps {
  onSuccess?: (response: SuiTransactionBlockResponse) => void
  onError?: (e: Error) => void
}

const useTransact = ({ onSuccess, onError }: IProps = {}) => {
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock()
  const { useNetworkVariable } = useNetworkConfig()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  const transact = (txb: TransactionBlock) => {
    const notificationId = notification.txLoading()

    signAndExecute(
      {
        // @todo: Handle types properly.
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        transactionBlock: txb as any,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      },
      {
        onError: (e: Error) => {
          notification.txError(e, null, notificationId)
          if (onError != null) {
            onError(e)
          }
        },
        onSuccess: (tx: SuiTransactionBlockResponse) => {
          client
            .waitForTransactionBlock({
              digest: tx.digest,
            })
            .then(() => {
              notification.txSuccess(
                transactionUrl(explorerUrl, tx.digest),
                notificationId
              )
              if (onSuccess != null) {
                onSuccess(tx)
              }
            })
        },
      }
    )
  }

  return { transact }
}

export default useTransact
