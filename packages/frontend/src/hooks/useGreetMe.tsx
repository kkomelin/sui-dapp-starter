import {
  CONTRACT_PACKAGE_VARIABLE_NAME,
  useNetworkVariable,
} from '@/config/networks'
import { fullFunctionName } from '@/helpers/greeting'
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'

interface IParams {
  onSuccess: () => void
}

export const useGreetMe = ({ onSuccess }: IParams) => {
  const client = useSuiClient()
  const packageId = useNetworkVariable(CONTRACT_PACKAGE_VARIABLE_NAME)
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock()

  const greetMe = (objectId: string, name: string) => {
    const txb = new TransactionBlock()

    txb.moveCall({
      arguments: [txb.object(objectId), txb.pure.string(name)],
      target: fullFunctionName(packageId, 'set_name'),
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
        onSuccess: (tx) => {
          client
            .waitForTransactionBlock({
              digest: tx.digest,
            })
            .then(() => {
              onSuccess()
            })
        },
      }
    )
  }

  return { greetMe }
}

export default useGreetMe
