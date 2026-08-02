import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'
import './styles/responsive.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
)
