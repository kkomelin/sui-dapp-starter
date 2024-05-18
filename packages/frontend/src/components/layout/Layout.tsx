import { FC, PropsWithChildren } from 'react'
import Body from './Body'
import Extra from './Extra'
import Footer from './Footer'
import Header from './Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Header />

      <Body>{children}</Body>

      <Footer />
      <Extra />
    </div>
  )
}

export default Layout
