import { ConnectButton } from '@mysten/dapp-kit'
import { FC } from 'react'
import GreetingForm from './GreetingForm'
import Layout from './Layout'
import NetworkType from './NetworkType'

const App: FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-3">
        <NetworkType />
        <ConnectButton />
      </div>

      <div className="mb-36 mt-10">
        <GreetingForm />
      </div>
    </Layout>
  )
}

export default App
