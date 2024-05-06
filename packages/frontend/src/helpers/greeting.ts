import { CONTRACT_MODULE_NAME } from '@/config/networks'

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
