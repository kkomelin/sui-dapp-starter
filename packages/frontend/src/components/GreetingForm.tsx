import { fromBytesToString } from '@/helpers/greeting'
import useCreateGreeting from '@/hooks/useCreateGreeting'
import useGreetMe from '@/hooks/useGreetMe'
import { isValidSuiObjectId } from '@mysten/sui.js/utils'
import { Button, TextField } from '@radix-ui/themes'
import { ChangeEvent, MouseEvent, useState } from 'react'
import useOwnGreeting from '../hooks/useOwnGreeting'

const GreetingForm = () => {
  const [name, setName] = useState<string>('')

  const { data, isPending, error, refetch } = useOwnGreeting()
  const { create } = useCreateGreeting({
    onCreate: (_: string) => {
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

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  if (!data.data) return <div>Not found</div>

  return (
    <div className="my-2 flex flex-col">
      {data.data.length === 0 ? (
        <div className="flex flex-col">
          <Button variant="solid" size="4" onClick={handleCreateGreetingClick}>
            Start
          </Button>
        </div>
      ) : (
        <div>
          {data.data[0].data?.content?.fields.name.length !== 0 ? (
            <div className="flex max-w-lg flex-col gap-6">
              <h1 className="from-sds-blue to-sds-pink bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
                Hello,{' '}
                {fromBytesToString(data.data[0].data?.content?.fields.name)}
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
            <div className="flex max-w-lg flex-col gap-6">
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
