import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'elencanto-lang'

function getInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'es') return saved
  return 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'es' ? 'en' : 'es'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
      toggleLang,
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
