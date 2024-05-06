import { ConnectButton } from '@mysten/dapp-kit'
import { FC } from 'react'
import Greeting from './Greeting'
import Layout from './Layout'

const App: FC = () => {
  return (
    <Layout>
      <ConnectButton />

      <div className="mt-8">
        <Greeting />
      </div>
    </Layout>
  )
}

export default App
