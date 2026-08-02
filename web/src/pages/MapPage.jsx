import { useCallback, useEffect, useState } from 'react'
import MapView from '../components/MapView'
import MapLegend from '../components/MapLegend'
import MapHelp from '../components/MapHelp'
import MapIntro from '../components/MapIntro'
import '../styles/map-sidebar.css'
import '../styles/map-intro.css'

function MapPage() {
  const skipIntro =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [showIntro, setShowIntro] = useState(!skipIntro)
  const [mountMap, setMountMap] = useState(skipIntro)
  const [mapVisible, setMapVisible] = useState(skipIntro)
  const [uiVisible, setUiVisible] = useState(skipIntro)

  useEffect(() => {
    if (skipIntro) return undefined

    document.body.classList.add('map-intro-active')
    if (mapVisible) document.body.classList.add('map-intro-map-visible')
    if (uiVisible) document.body.classList.add('map-intro-ui-visible')

    return () => {
      document.body.classList.remove(
        'map-intro-active',
        'map-intro-map-visible',
        'map-intro-ui-visible',
      )
    }
  }, [skipIntro, mapVisible, uiVisible])

  const handleMapReveal = useCallback(() => {
    setMountMap(true)
    setMapVisible(true)
    document.body.classList.add('map-intro-map-visible')
  }, [])

  const handleUiReveal = useCallback(() => {
    setUiVisible(true)
    document.body.classList.add('map-intro-ui-visible')
  }, [])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    document.body.classList.remove(
      'map-intro-active',
      'map-intro-map-visible',
      'map-intro-ui-visible',
    )
  }, [])

  return (
    <div
      className={`map-page${mapVisible ? ' is-map-visible' : ''}${uiVisible ? ' is-ui-visible' : ''}`}
    >
      {mountMap && <MapView />}
      <div className="map-sidebar">
        <MapHelp />
        <MapLegend />
      </div>
      {showIntro && (
        <MapIntro
          onMapReveal={handleMapReveal}
          onUiReveal={handleUiReveal}
          onComplete={handleIntroComplete}
        />
      )}
    </div>
  )
}

export default MapPage
