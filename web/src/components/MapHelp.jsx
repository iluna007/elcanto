import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import MapHelpIcon from './MapHelpIcon'
import '../styles/map-help.css'

function MapHelp() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(true)

  if (!open) {
    return (
      <button
        type="button"
        className="map-help__fab"
        onClick={() => setOpen(true)}
        aria-label={t.map.helpTitle}
      >
        <MapHelpIcon name="legend" />
      </button>
    )
  }

  return (
    <aside className="map-help">
      <div className="map-help__header">
        <h2>{t.map.helpTitle}</h2>
        <button type="button" onClick={() => setOpen(false)} aria-label={t.map.helpClose}>
          ×
        </button>
      </div>

      <ul className="map-help__list">
        {t.map.helpItems.map((item) => (
          <li key={item.title}>
            <MapHelpIcon name={item.icon} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="map-help__note">{t.map.boundsNote}</p>
    </aside>
  )
}

export default MapHelp
