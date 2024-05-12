import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import Logo from '../assets/logo.svg'
import AnimatedBackground from './AnimatedBackground'
import ThemeSwitcher from './ThemeSwitcher'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <header className="flex flex-col items-center gap-3">
        <img src={Logo} alt="Logo" className="h-16 w-16" />
        <div className="text-2xl sm:text-3xl">{import.meta.env.VITE_APP_NAME}</div>
      </header>
      <main className="py-8">{children}</main>
      <div className="absolute right-0 top-0 p-3">
        <ThemeSwitcher />
      </div>
      <AnimatedBackground />
      <Toaster
        toastOptions={{
          className:
            'dark:bg-sds-dark bg-sds-light text-sds-dark dark:text-sds-light',
        }}
      />
    </div>
  )
}

export default Layout
