import { ConnectButton } from '@mysten/dapp-kit'
import '@mysten/dapp-kit/dist/index.css'
import { FC } from 'react'
import Layout from './Layout'

const App: FC = () => {
  return (
    <Layout>
      <ConnectButton />
    </Layout>
  )
}

export default App
