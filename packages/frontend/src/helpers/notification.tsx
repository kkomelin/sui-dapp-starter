import toast, { Renderable } from 'react-hot-toast'

export const reportLoading = (message: Renderable) => {
  return toast.loading(message)
}

export const reportError = (
  error: Error | null,
  userFriendlyMessage?: string | null,
  id?: string
) => {
  if (error != null) {
    console.error(error)
  }

  const message =
    userFriendlyMessage || error?.message || 'An error has occurred'

  return toast.error(message, { id })
}

export const reportSuccess = (message: Renderable, id?: string) => {
  return toast.success(message, { id, duration: 4000 })
}

export const reportTxLoading = () => {
  return reportLoading('Confirm this transaction in your wallet')
}

export const reportTxError = (
  error: Error | null,
  userFriendlyMessage?: string | null,
  id?: string
) => {
  return reportError(error, userFriendlyMessage, id)
}

export const reportTxSuccess = (transactionUrl: string, id?: string) => {
  const content = (
    <div className="flex flex-row gap-2">
      <div>Transaction submitted</div>
      <a href={transactionUrl}>(view)</a>
    </div>
  )
  return reportSuccess(content, id)
}
