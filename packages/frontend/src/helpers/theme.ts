import { TTheme } from '~~/types/TTheme'

export const detectBrowserTheme = (): TTheme => {
  return !('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}
