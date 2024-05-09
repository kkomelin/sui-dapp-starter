import {
  EXPLORER_URL_VARIABLE_NAME,
  useNetworkVariable,
} from '@/config/networks'
import { transactionUrl } from '@/helpers/networks'
import {
  reportTxError,
  reportTxLoading,
  reportTxSuccess,
} from '@/helpers/notification'
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit'
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client'
import { TransactionBlock } from '@mysten/sui.js/transactions'

interface IProps {
  functionName: `${string}::${string}::${string}`
  onSuccess?: (response: SuiTransactionBlockResponse) => void
  onError?: (e: Error) => void
}

const useTransact = ({ functionName, onSuccess, onError }: IProps) => {
  const client = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock()
  const explorerUrl = useNetworkVariable(EXPLORER_URL_VARIABLE_NAME)

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const transact = (txb: TransactionBlock, args: any[] = []) => {
    txb.moveCall({
      arguments: args,
      target: functionName,
    })

    const notificationId = reportTxLoading()

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
          reportTxError(e, null, notificationId)
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
              reportTxSuccess(
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
