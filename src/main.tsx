import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/fonts.css'
import '@moysklad/uikit/colorVariables.css'
import './index.css'
import App from './App.tsx'
import { PasswordGate } from './components/PasswordGate/PasswordGate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordGate>
      <App />
    </PasswordGate>
  </StrictMode>,
)
