import { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import toast from 'react-hot-toast'

export const reactRender = (component: ReactNode) => {
  return ReactDOM.createRoot(document.getElementById('root')!).render(component)
}

export const handleError = (
  error: Error | null,
  userFriendlyMessage?: string
) => {
  // @todo: Implement toast messages.
  if (error != null) {
    console.log(error)
  }

  const message =
    userFriendlyMessage || error?.message || 'An error has occurred'

  toast.error(message)
}

export const handleSuccess = (message: string) => {
  toast.success(message)
}
