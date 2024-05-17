export const transactionUrl = (explorerUrl: string, txDigest: string) => {
  return `${explorerUrl}/txblock/${txDigest}`
}

export const formatNetworkType = (machineName: string) => {
  if (machineName.startsWith('sui:')) {
    return machineName.substring(4)
  }
  return machineName
}
