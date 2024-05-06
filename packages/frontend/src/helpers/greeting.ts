import { CONTRACT_MODULE_NAME } from '@/config/networks'
import { IGreeting } from '@/types/IGreeting'
import { SuiObjectData } from '@mysten/sui.js/client'

export const fullFunctionName = (
  packageId: string,
  functionName: string
): `${string}::${string}::${string}` => {
  return `${packageId}::${CONTRACT_MODULE_NAME}::${functionName}`
}

export const fullStructName = (
  packageId: string,
  structName: string
): `${string}::${string}::${string}` => {
  return `${packageId}::${CONTRACT_MODULE_NAME}::${structName}`
}
