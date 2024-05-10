import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import c from 'clsx'
import { FC, PropsWithChildren } from 'react'
import toast, { ToastType } from 'react-hot-toast'

interface INotification {
  id?: string
  type: ToastType
}
const Notification: FC<PropsWithChildren<INotification>> = ({
  children,
  id,
  type,
}) => {
  const isCloseButtonVisible = id !== null && type !== 'loading'

  return (
    <div className="flex flex-row items-center gap-2">
      <div className={c({ 'mr-2': isCloseButtonVisible })}>{children}</div>
      {isCloseButtonVisible && (
        <Button
          variant="ghost"
          className="cursor-pointer text-sds-dark dark:text-sds-light"
          onClick={() => toast.dismiss(id)}
        >
          <Cross1Icon />
        </Button>
      )}
    </div>
  )
}

export default Notification
