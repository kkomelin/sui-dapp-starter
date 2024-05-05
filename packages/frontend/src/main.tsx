import App from '@/components/App'
import { reactRender } from '@/helpers/misc.ts'
import SuiProvider from '@/providers/SuiProvider.tsx'
import { StrictMode } from 'react'
import Theme from './components/Theme'
import './styles/index.css'

reactRender(
  <StrictMode>
    <Theme>
      <SuiProvider>
        <App />
      </SuiProvider>
    </Theme>
  </StrictMode>
)
