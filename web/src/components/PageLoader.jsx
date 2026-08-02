import { useEffect, useState } from 'react'
import LogoSplash from './LogoSplash'

function PageLoader() {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('drawing'), 400)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <LogoSplash
      phase={phase}
      className="map-intro--page-loader"
      label="El Encanto"
    />
  )
}

export default PageLoader
