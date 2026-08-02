import { useCallback, useEffect, useRef, useState } from 'react'
import LogoSplash from './LogoSplash'

const READY_MS = 350
const EXIT_DURATION_MS = 2400

function MapIntro({ onMapReveal, onComplete }) {
  const timersRef = useRef([])
  const continuedRef = useRef(false)
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('ready'), READY_MS)
    timersRef.current.push(timer)

    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const handleContinue = useCallback(() => {
    if (continuedRef.current || phase !== 'ready') return
    continuedRef.current = true

    onMapReveal?.()
    setPhase('filling')

    const timer = window.setTimeout(() => onComplete?.(), EXIT_DURATION_MS)
    timersRef.current.push(timer)
  }, [phase, onMapReveal, onComplete])

  return (
    <LogoSplash
      phase={phase}
      exitDurationMs={EXIT_DURATION_MS}
      onContinue={handleContinue}
    />
  )
}

export default MapIntro
