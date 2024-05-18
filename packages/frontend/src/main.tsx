import '@mysten/dapp-kit/dist/index.css'
import '@radix-ui/themes/styles.css'
import { StrictMode } from 'react'
import App from '~~/components/App'
import { reactRender } from '~~/helpers/misc.ts'
import SuiProvider from '~~/providers/SuiProvider.tsx'
import ThemeProvider from '~~/providers/ThemeProvider'
import '~~/styles/index.css'

reactRender(
  <StrictMode>
    <ThemeProvider>
      <SuiProvider>
        <App />
      </SuiProvider>
    </ThemeProvider>
  </StrictMode>
)
