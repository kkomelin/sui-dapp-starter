import { ConnectButton } from '@mysten/dapp-kit'
import { FC } from 'react'
import GreetingForm from './GreetingForm'
import Layout from './Layout'

const App: FC = () => {
  return (
    <Layout>
      <ConnectButton />

      <div className="mt-8">
        <GreetingForm />
      </div>
    </Layout>
  )
}

export default App
