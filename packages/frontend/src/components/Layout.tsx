import { FC, PropsWithChildren } from 'react'
import AnimatedBackground from './AnimatedBackground'
import ThemeSwitcher from './ThemeSwitcher'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center py-8">
        {children}
      </main>
      <AnimatedBackground />
      <div className="absolute right-0 top-0 p-3">
        <ThemeSwitcher />
      </div>
    </>
  )
}

export default Layout
