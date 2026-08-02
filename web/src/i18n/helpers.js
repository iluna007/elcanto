import { properties, getPropertyBySlug } from '../data/properties'
import { mergePropertyTranslation } from './propertyTranslations'
import { translations } from './translations'

export function getLocalizedProperty(slug, lang) {
  return mergePropertyTranslation(getPropertyBySlug(slug), lang)
}

export function getLocalizedProperties(lang) {
  return properties.map((p) => mergePropertyTranslation(p, lang))
}

export function getStatusLabel(status, lang = 'es') {
  return translations[lang]?.status?.[status] ?? status
}

export function getStatusFilters(lang) {
  const { projects: p, status: s } = translations[lang]
  return [
    { key: 'all', label: p.filterAll },
    { key: 'disponible', label: s.disponible },
    { key: 'desarrollo', label: s.desarrollo },
    { key: 'proximamente', label: s.proximamente },
  ]
}
