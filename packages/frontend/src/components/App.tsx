import { FC } from 'react'
import GreetingForm from '~~/components/GreetingForm'
import Layout from '~~/components/layout/Layout'

const App: FC = () => {
  return (
    <Layout>
      <div className="justify-content flex flex-grow flex-col items-center justify-center rounded-md p-3">
        <GreetingForm />
      </div>
    </Layout>
  )
}

export default App
