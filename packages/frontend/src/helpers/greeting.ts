import { IGreeting } from '@/types/IGreeting'
import { SuiObjectData } from '@mysten/sui.js/client'

export const fullFunctionName = (
  packageId: string,
  functionName: string
): `${string}::${string}::${string}` => {
  return `${packageId}::greeting::${functionName}`
}

export const isGreetingOwnedByCurrentAccount = (
  data: SuiObjectData | null | undefined,
  currentAccount: any
) => {
  if (data == null) {
    return false
  }

  return getGreetingFields(data)?.owner === currentAccount?.address
}

export const getGreetingFields = (data?: SuiObjectData | null) => {
  if (data == null || data.content?.dataType !== 'moveObject') {
    return null
  }

  return data.content.fields as unknown as IGreeting
}
