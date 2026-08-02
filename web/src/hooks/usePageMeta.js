import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta({ title, description }) {
  const { lang } = useLanguage()

  useEffect(() => {
    if (title) document.title = title
    if (description) {
      setMeta('description', description)
      setMeta('og:description', description, 'property')
      setMeta('twitter:description', description)
    }
    if (title) {
      setMeta('og:title', title, 'property')
      setMeta('twitter:title', title)
    }
  }, [title, description, lang])
}
