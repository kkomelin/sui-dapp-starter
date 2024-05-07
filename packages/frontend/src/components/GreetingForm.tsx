import { fromBytesToString, getContentField } from '@/helpers/greeting'
import useCreateGreeting from '@/hooks/useCreateGreeting'
import useGreetMe from '@/hooks/useGreetMe'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { isValidSuiObjectId } from '@mysten/sui.js/utils'
import { Button, TextField } from '@radix-ui/themes'
import { ChangeEvent, MouseEvent, useState } from 'react'
import useOwnGreeting from '../hooks/useOwnGreeting'

const GreetingForm = () => {
  const [name, setName] = useState<string>('')
  const currentAccount = useCurrentAccount()
  const { data, isPending, error, refetch } = useOwnGreeting()
  const { create } = useCreateGreeting({
    onCreate: () => {
      refetch()
    },
  })
  const { greetMe } = useGreetMe({
    onSuccess: () => {
      refetch()
    },
  })

  const handleCreateGreetingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    create()
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleGreetMe = (objectId: string | undefined) => {
    if (objectId == null || !isValidSuiObjectId(objectId)) {
      alert('Error: Object ID is not valid')
      // @fixme: Report error properly.
      return
    }

    if (name.trim().length === 0) {
      alert('Error: Name is empty')
      // @fixme: Report error properly.
      return
    }

    greetMe(objectId, name)
  }

  const handleReset = (objectId: string | undefined) => {
    if (objectId == null || !isValidSuiObjectId(objectId)) {
      alert('Error: Object ID is not valid')
      // @fixme: Report error properly.
      return
    }

    greetMe(objectId, '')
  }

  if (currentAccount == null) return <div>Please connect your Sui wallet</div>

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!data.data) return <div>Not found</div>

  return (
    <div className="my-2 flex flex-col justify-center items-center">
      {data.data.length === 0 ? (
        <div className="flex flex-col">
          <Button variant="solid" size="4" onClick={handleCreateGreetingClick}>
            Start
          </Button>
        </div>
      ) : (
        <div>
          {getContentField(data.data[0], 'name')?.length !== 0 ? (
            <div className="flex w-full max-w-xs flex-col gap-6 sm:max-w-lg px-2">
              <h1 className="bg-gradient-to-r from-sds-blue to-sds-pink bg-clip-text text-4xl sm:text-5xl font-bold text-transparent">
                Hello,{' '}
                {fromBytesToString(getContentField(data.data[0], 'name'))}
              </h1>
              <Button
                variant="solid"
                size="4"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  handleReset(data.data[0].data?.objectId)
                }}
              >
                Start over
              </Button>
            </div>
          ) : (
            <div className="flex w-full max-w-xs flex-col gap-6 sm:max-w-lg px-2">
              <TextField.Root
                size="3"
                placeholder="Enter your name..."
                onChange={handleNameChange}
                required
              />
              <Button
                variant="solid"
                size="4"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault()
                  handleGreetMe(data.data[0].data?.objectId)
                }}
              >
                Greet me!
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GreetingForm
