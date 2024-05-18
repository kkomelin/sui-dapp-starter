import { SuiObjectResponse } from '@mysten/sui.js/client'
import { isValidSuiObjectId } from '@mysten/sui.js/utils'
import { CONTRACT_MODULE_NAME } from '~~/config/networks'

export const fullFunctionName = (
  packageId: string,
  functionName: string
): `${string}::${string}::${string}` => {
  return `${fullModuleName(packageId)}::${functionName}`
}

export const fullStructName = (
  packageId: string,
  structName: string
): `${string}::${string}::${string}` => {
  return `${fullModuleName(packageId)}::${structName}`
}

export const fromBytesToString = (bytes: number[]): string => {
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export const getResponseContentField = (
  response: SuiObjectResponse | null | undefined,
  field: string
) => {
  if (
    response == null ||
    response.data == null ||
    response.data?.content == null
  ) {
    return null
  }

  if (response.data.content?.dataType !== 'moveObject') {
    return null
  }

  // @todo Find a better way to extract fields from SuiParsedData.
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const content = response.data.content as any

  if (content.fields == null) {
    return null
  }

  return content.fields[field]
}

export const getResponseObjectId = (
  response: SuiObjectResponse | null | undefined
) => {
  if (
    response == null ||
    response.data == null ||
    response.data?.objectId == null
  ) {
    return null
  }

  const objectId = response.data.objectId

  if (!isValidSuiObjectId(objectId)) {
    return null
  }

  return objectId
}

const fullModuleName = (packageId: string): `${string}::${string}` => {
  return `${packageId}::${CONTRACT_MODULE_NAME}`
}
