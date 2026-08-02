import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPropertyBySlug } from '../data/properties'

/** Sincroniza colores del proyecto activo con CSS vars y data-attribute en <html> */
export function useProjectTheme() {
  const { pathname } = useLocation()

  useEffect(() => {
    const match = pathname.match(/^\/proyectos\/([^/]+)/)
    const property = match ? getPropertyBySlug(match[1]) : null
    const root = document.documentElement

    if (property) {
      root.style.setProperty('--project-fill', property.fillColor)
      root.style.setProperty('--project-line', property.lineColor)
      root.style.setProperty('--project-accent', property.accentColor)
      root.dataset.project = property.slug
    } else {
      root.style.removeProperty('--project-fill')
      root.style.removeProperty('--project-line')
      root.style.removeProperty('--project-accent')
      delete root.dataset.project
    }
  }, [pathname])
}

export function getActiveProjectSlug(pathname) {
  const match = pathname.match(/^\/proyectos\/([^/]+)/)
  return match?.[1] ?? null
}
