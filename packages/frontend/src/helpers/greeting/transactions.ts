import { TransactionBlock } from '@mysten/sui.js/transactions'
import { fullFunctionName } from '~~/helpers/greeting/misc'

export const prepareCreateGreetingTransaction = (
  packageId: string
): TransactionBlock => {
  const txb = new TransactionBlock()
  txb.moveCall({
    arguments: [],
    target: fullFunctionName(packageId, 'create'),
  })

  return txb
}

export const prepareSetGreetingTransaction = (
  packageId: string,
  objectId: string,
  name: string
): TransactionBlock => {
  const txb = new TransactionBlock()
  txb.moveCall({
    arguments: [txb.object(objectId), txb.pure.string(name), txb.object('0x8')],
    target: fullFunctionName(packageId, 'set_greeting'),
  })

  return txb
}

export const prepareResetGreetingTransaction = (
  packageId: string,
  objectId: string
): TransactionBlock => {
  const txb = new TransactionBlock()
  txb.moveCall({
    arguments: [txb.object(objectId)],
    target: fullFunctionName(packageId, 'reset_greeting'),
  })

  return txb
}
