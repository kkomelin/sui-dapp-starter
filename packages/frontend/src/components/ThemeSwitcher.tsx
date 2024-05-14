import { detectBrowserTheme } from '@/helpers/theme'
import * as Toggle from '@radix-ui/react-toggle'
import { MoonIcon, SunIcon } from 'lucide-react'
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
      className="rounded-full p-2 shadow"
      aria-label="Toggle theme"
      onPressedChange={toggleTheme}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Toggle.Root>
  )
}

export default ThemeSwitcher
