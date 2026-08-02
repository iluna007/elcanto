import { useCallback, useLayoutEffect, useState } from 'react'
import MapView from '../components/MapView'
import MapLegend from '../components/MapLegend'
import MapHelp from '../components/MapHelp'
import MapIntro from '../components/MapIntro'
import '../styles/map-sidebar.css'
import '../styles/map-intro.css'

function MapPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [mountMap, setMountMap] = useState(false)
  const [mapVisible, setMapVisible] = useState(false)
  const [uiVisible, setUiVisible] = useState(false)

  useLayoutEffect(() => {
    document.documentElement.classList.add('site-intro-active')
    document.body.classList.add('map-intro-active')

    return () => {
      document.documentElement.classList.remove('site-intro-active')
      document.body.classList.remove('map-intro-active', 'map-intro-ui-visible')
    }
  }, [])

  const handleMapReveal = useCallback(() => {
    setMountMap(true)
    setMapVisible(true)
  }, [])

  const handleUiReveal = useCallback(() => {
    setUiVisible(true)
    document.body.classList.add('map-intro-ui-visible')
  }, [])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    document.documentElement.classList.remove('site-intro-active')
    document.body.classList.remove('map-intro-active', 'map-intro-ui-visible')
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
