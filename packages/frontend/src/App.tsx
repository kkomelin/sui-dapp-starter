import { ConnectButton } from '@mysten/dapp-kit'
import '@mysten/dapp-kit/dist/index.css'
import { FC } from 'react'
import AnimatedBackground from './components/AnimatedBackground'

const App: FC = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <ConnectButton />
        </div>
      </main>
      <AnimatedBackground />
    </>
  )
}

export default App
