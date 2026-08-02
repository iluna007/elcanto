import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/properties'
import { useLanguage } from '../i18n/LanguageContext'
import { useIsMobile } from '../hooks/useMediaQuery'
import '../styles/map-legend.css'

function MapLegend() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!isMobile)
  }, [isMobile])

  if (!open) {
    return (
      <button
        type="button"
        className="map-legend__fab"
        onClick={() => setOpen(true)}
        aria-label={t.map.legendTitle}
      >
        <span className="map-legend__fab-swatches" aria-hidden="true">
          {properties.map((property) => (
            <span
              key={property.id}
              style={{
                background: property.fillColor,
                boxShadow: `0 0 0 1px ${property.lineColor}`,
              }}
            />
          ))}
        </span>
      </button>
    )
  }

  return (
    <aside className="map-legend">
      <div className="map-legend__header">
        <p className="map-legend__title">{t.map.legendTitle}</p>
        <button type="button" onClick={() => setOpen(false)} aria-label={t.map.helpClose}>
          ×
        </button>
      </div>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <Link to={property.link} className="map-legend__item">
              <span
                className="map-legend__swatch"
                style={{
                  background: property.fillColor,
                  boxShadow: `0 0 0 2px ${property.lineColor}`,
                }}
              />
              <span className="map-legend__name">{property.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default MapLegend
