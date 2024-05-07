import { detectBrowserTheme } from '@/helpers/theme'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import * as Toggle from '@radix-ui/react-toggle'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage('theme', detectBrowserTheme(), {
    raw: true,
  })

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme!)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Toggle.Root
      className="rounded-full border border-sds-dark p-2 dark:border-sds-light"
      aria-label="Toggle theme"
      onPressedChange={toggleTheme}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Toggle.Root>
  )
}

export default ThemeSwitcher
