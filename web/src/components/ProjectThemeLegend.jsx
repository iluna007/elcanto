import { getPropertyBySlug } from '../data/properties'
import { useLanguage } from '../i18n/LanguageContext'

function ProjectThemeLegend({ slug }) {
  const { t } = useLanguage()
  const property = getPropertyBySlug(slug)
  if (!property) return null

  return (
    <div
      className="project-theme-legend"
      style={{
        '--legend-fill': property.fillColor,
        '--legend-line': property.lineColor,
      }}
    >
      <span
        className="project-theme-legend__swatch"
        style={{
          background: property.fillColor,
          boxShadow: `0 0 0 2px ${property.lineColor}`,
        }}
      />
      <div className="project-theme-legend__text">
        <span className="project-theme-legend__label">{t.projectDetail.mapColorLabel}</span>
        <strong>{property.name}</strong>
      </div>
    </div>
  )
}

export default ProjectThemeLegend
