import { useEffect, useRef, useState } from 'react'
import LogoSplash from './LogoSplash'

const TIMING = {
  drawStart: 700,
  fillLogo: 5200,
  mapReveal: 5800,
  showUi: 7200,
  complete: 9000,
}

function MapIntro({ onMapReveal, onUiReveal, onComplete }) {
  const timersRef = useRef([])
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const timers = timersRef.current

    timers.push(window.setTimeout(() => setPhase('drawing'), TIMING.drawStart))
    timers.push(window.setTimeout(() => setPhase('filling'), TIMING.fillLogo))
    timers.push(window.setTimeout(() => {
      setPhase('exit')
      onMapReveal?.()
    }, TIMING.mapReveal))
    timers.push(window.setTimeout(() => onUiReveal?.(), TIMING.showUi))
    timers.push(window.setTimeout(() => onComplete?.(), TIMING.complete))

    return () => {
      timers.forEach(clearTimeout)
      timers.length = 0
    }
  }, [onMapReveal, onUiReveal, onComplete])

  return <LogoSplash phase={phase} />
}

export default MapIntro
