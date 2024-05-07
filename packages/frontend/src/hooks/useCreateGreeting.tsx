import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  useNetworkVariable,
} from '@/config/networks'
import { fullFunctionName } from '@/helpers/greeting'
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit'
import { SuiTransactionBlockResponse } from '@mysten/sui.js/client'
import { TransactionBlock } from '@mysten/sui.js/transactions'

interface IParams {
  onCreate: (id: string) => void
  onError?: (e: Error) => void
}

export const useCreateGreeting = ({ onCreate, onError }: IParams) => {
  const client = useSuiClient()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock()

  const create = () => {
    const txb = new TransactionBlock()

    txb.moveCall({
      arguments: [],
      target: fullFunctionName(packageId, 'create'),
    })

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
        onError,
        onSuccess: (tx: SuiTransactionBlockResponse) => {
          client
            .waitForTransactionBlock({
              digest: tx.digest,
            })
            .then(() => {
              const objectId = tx.effects?.created?.[0]?.reference?.objectId

              if (objectId) {
                onCreate(objectId)
              }
            })
        },
      }
    )
  }

  return { create }
}

export default useCreateGreeting
