import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import AnimatedBackground from './AnimatedBackground'
import Header from './Header'
import ThemeSwitcher from './ThemeSwitcher'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-8">
      <div className="absolute right-0 top-0 p-3">
        <ThemeSwitcher />
      </div>

      <Header />
      <main className="py-8">{children}</main>

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
