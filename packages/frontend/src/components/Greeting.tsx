import useCreateGreeting from '@/hooks/useCreateGreeting'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { Button } from '@radix-ui/themes'
import { MouseEvent } from 'react'
import useOwnGreeting from '../hooks/useOwnGreeting'

const Greeting = () => {
  const currentAccount = useCurrentAccount()
  const { data, isPending, error, refetch } = useOwnGreeting()
  const { create } = useCreateGreeting({
    onCreate: (id: string) => {
      console.log(id)
      refetch()
    },
  })

  const handleCreateGreetingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    create()
  }

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!data.data) return <div>Not found</div>

  return (
    <div className="my-2 flex flex-col">
      {data.data.length === 0 ? (
        <div className="flex flex-col gap-2">
          <div>No greetings owned by the connected wallet</div>
          <Button variant="solid" onClick={handleCreateGreetingClick}>
            Create one
          </Button>
        </div>
      ) : (
        <div>
          {data.data.map((object) => (
            <div className="flex max-w-lg flex-col" key={object.data?.objectId}>
              <div>{JSON.stringify(object, null, 2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Greeting
