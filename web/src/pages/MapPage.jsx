import { useCallback, useLayoutEffect, useState } from 'react'
import MapView from '../components/MapView'
import MapLegend from '../components/MapLegend'
import MapHelp from '../components/MapHelp'
import MapIntro from '../components/MapIntro'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import '../styles/map-sidebar.css'
import '../styles/map-intro.css'

function MapPage() {
  const { t } = useLanguage()
  usePageMeta({ title: t.meta.mapTitle, description: t.meta.mapDescription })

  const [showIntro, setShowIntro] = useState(true)
  const [mountMap, setMountMap] = useState(false)

  useLayoutEffect(() => {
    document.documentElement.classList.add('site-intro-active')
    document.body.classList.add('map-intro-active')

    return () => {
      document.documentElement.classList.remove('site-intro-active')
      document.body.classList.remove('map-intro-active', 'map-intro-ui-ready')
    }
  }, [])

  const handleMapReveal = useCallback(() => {
    setMountMap(true)
    document.documentElement.classList.add('site-intro-ui-ready')
    document.body.classList.add('map-intro-ui-ready')
  }, [])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    document.documentElement.classList.remove('site-intro-active', 'site-intro-ui-ready')
    document.body.classList.remove('map-intro-active', 'map-intro-ui-ready')
  }, [])

  return (
    <div className="map-page is-ui-visible">
      {mountMap && <MapView />}
      <div className="map-sidebar">
        <MapHelp />
        <MapLegend />
      </div>
      {showIntro && (
        <MapIntro onMapReveal={handleMapReveal} onComplete={handleIntroComplete} />
      )}
    </div>
  )
}

export default MapPage
