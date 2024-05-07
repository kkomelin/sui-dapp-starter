import { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'

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

  alert(userFriendlyMessage || error?.message)
}
