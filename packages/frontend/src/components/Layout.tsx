import { FC, PropsWithChildren } from 'react'
import AnimatedBackground from './AnimatedBackground'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
      <AnimatedBackground />
    </>
  )
}

export default Layout
