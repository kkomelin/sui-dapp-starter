import { fromBytesToString, getContentField } from '@/helpers/greeting'
import { notification } from '@/helpers/notification'
import useCreateGreeting from '@/hooks/useCreateGreeting'
import useGreet from '@/hooks/useGreet'
import useReset from '@/hooks/useReset'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { isValidSuiObjectId } from '@mysten/sui.js/utils'
import { Button, TextField } from '@radix-ui/themes'
import { ChangeEvent, FC, MouseEvent, PropsWithChildren, useState } from 'react'
import useOwnGreeting from '../hooks/useOwnGreeting'
import AnimalEmoji from './Emoji'

const GreetingForm = () => {
  const [name, setName] = useState<string>('')
  const currentAccount = useCurrentAccount()
  const { data, isPending, error, refetch } = useOwnGreeting()
  const { create } = useCreateGreeting({
    onSuccess: () => {
      refetch()
    },
  })
  const { greet } = useGreet({
    onSuccess: () => {
      refetch()
    },
  })
  const { reset } = useReset({
    onSuccess: () => {
      refetch()
    },
  })

  const handleCreateGreetingClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // @todo: Find a way to refactor this code.
    const txb = new TransactionBlock()
    create(txb)
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleGreetMe = (objectId: string | undefined) => {
    if (objectId == null || !isValidSuiObjectId(objectId)) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    if (name.trim().length === 0) {
      notification.error(null, 'Name cannot be empty')
      return
    }

    // @todo: Find a way to refactor this code.
    const txb = new TransactionBlock()
    const args = [
      txb.object(objectId),
      txb.pure.string(name),
      txb.object('0x8'),
    ]
    greet(txb, args)
  }

  const handleReset = (objectId: string | undefined) => {
    if (objectId == null || !isValidSuiObjectId(objectId)) {
      notification.error(null, 'Object ID is not valid')
      return
    }

    // @todo: Find a way to refactor this code.
    const txb = new TransactionBlock()
    const args = [txb.object(objectId)]
    reset(txb, args)
  }

  if (currentAccount == null)
    return <TextMessage>Please connect your Sui wallet</TextMessage>

  if (isPending) return <TextMessage>Loading...</TextMessage>

  // @todo: Handle the following errors with toasts.
  if (error) return <TextMessage>Error: {error.message}</TextMessage>

  if (!data.data) return <TextMessage>Not found</TextMessage>

  return (
    <div className="my-2 flex flex-col items-center justify-center">
      {data.data.length === 0 ? (
        <div className="flex flex-col">
          <Button variant="solid" size="4" onClick={handleCreateGreetingClick}>
            Start
          </Button>
        </div>
      ) : (
        <div>
          {getContentField(data.data[0], 'name')?.length !== 0 ? (
            <div className="flex w-full max-w-xs flex-col gap-6 px-2 sm:max-w-lg">
              <h1 className="bg-gradient-to-r from-sds-blue to-sds-pink bg-clip-text text-center text-4xl font-bold !leading-tight text-transparent sm:text-5xl">
                Greetings from{' '}
                <AnimalEmoji index={getContentField(data.data[0], 'emoji')} />,
                <br />
                {fromBytesToString(getContentField(data.data[0], 'name'))}!
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
            <div className="flex w-full max-w-xs flex-col gap-6 px-2 sm:max-w-lg">
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

const TextMessage: FC<PropsWithChildren> = ({ children }) => (
  <div className="text-center">{children}</div>
)
