import { ConnectButton } from '@mysten/dapp-kit'
import '@mysten/dapp-kit/dist/index.css'
import { FC } from 'react'

const App: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ConnectButton />
    </div>
  )
}

export default App
