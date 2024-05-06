import { Theme } from '@radix-ui/themes'
import { FC, PropsWithChildren } from 'react'

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Theme className="w-full">{children}</Theme>
}

export default ThemeProvider
