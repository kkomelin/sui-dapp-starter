export const transactionUrl = (explorerUrl: string, txDigest: string) => {
  return `${explorerUrl}/txblock/${txDigest}`
}
