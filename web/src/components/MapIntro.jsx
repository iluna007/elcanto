import { useEffect, useRef, useState } from 'react'
import '../styles/map-intro.css'

const LOGO_PATHS = [
  'M234.54,112.52c-5.68-69.38-101.14-67.99-140.91-27.59-21.55,21.89-27.69,51.65-11.2,79.11,19.74,32.88,51.88,45.54,89.56,43.12,44.3-2.84,76.19-23.01,114.74-42.19,20.43-10.17,53.12-19.25,70.36-.12,20.4,22.64-.1,45.68-22.88,52.28-19.61,5.68-45.02.63-65.56,2.11-21.39,1.54-43.73,6.41-63.85,13.65-36.13,13.01-72.07,38.11-84.47,76.35-26.15,80.62,24.81,145.83,105.79,155.53,70.05,8.39,151.38-14.71,170.34-90.37,21.34-85.17-91.02-110.95-152.12-83.45-28.04,12.62-41.64,37.16-37.66,67.21,4.46,33.71,42.86,43.01,70.48,41.51,33.36-1.81,50.31-42.62,7.12-40.27-17.27.94-24.85-36.88,4.77-35.68,38.75,1.57,49.26,22.81,44.17,57.05-9.42,63.32-97.78,51.08-133.74,20.98-48.3-40.43-19.39-122.75,34.76-137.78,48.65-13.51,95.97.61,143.33-22.4,33.16-16.11,57.24-44.3,48-82.11-9.12-37.35-50.53-48.59-84.04-45.98-21.65,1.69-42.28,5.95-62.8,13.05-26.6,9.2-48.5,27.36-74.87,36.59-29.28,10.25-53.13-2.03-64.83-29.51-4.64-10.9-5.37-30.11,9.22-35.15,18.76-6.49,22.57,20.18,23.44,30.9,2.02,24.65,65.07,10.32,62.85-16.84',
  'M320.97,72.51c0,23.33-18.91,42.24-42.24,42.24s-42.24-18.91-42.24-42.24,18.91-42.25,42.24-42.25,42.24,18.92,42.24,42.25',
  'M345.78,186.29c0,12.05-9.77,21.82-21.83,21.82s-21.82-9.77-21.82-21.82,9.77-21.83,21.82-21.83,21.83,9.77,21.83,21.83',
]

const TIMING = {
  drawStart: 400,
  mapReveal: 2000,
  fillLogo: 3400,
  hideLogo: 4000,
  showUi: 4500,
  complete: 5200,
}

function MapIntro({ onMapReveal, onUiReveal, onComplete }) {
  const pathRefs = useRef([])
  const timersRef = useRef([])
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const timers = timersRef.current

    const measureAndDraw = () => {
      const paths = pathRefs.current.filter(Boolean)
      paths.forEach((path, index) => {
        const length = Math.ceil(path.getTotalLength()) || 1000
        path.style.strokeDasharray = `${length}`
        path.style.strokeDashoffset = `${length}`
        path.style.animationDelay = `${index * 0.45}s`
      })
      setPhase('drawing')
    }

    timers.push(window.setTimeout(measureAndDraw, TIMING.drawStart))
    timers.push(window.setTimeout(() => onMapReveal?.(), TIMING.mapReveal))
    timers.push(window.setTimeout(() => setPhase('filling'), TIMING.fillLogo))
    timers.push(window.setTimeout(() => setPhase('exit'), TIMING.hideLogo))
    timers.push(window.setTimeout(() => onUiReveal?.(), TIMING.showUi))
    timers.push(window.setTimeout(() => onComplete?.(), TIMING.complete))

    return () => {
      timers.forEach(clearTimeout)
      timers.length = 0
    }
  }, [onMapReveal, onUiReveal, onComplete])

  return (
    <div className={`map-intro map-intro--${phase}`} aria-hidden="true">
      <div className="map-intro__backdrop" />
      <div className="map-intro__logo-wrap">
        <svg
          className="map-intro__logo"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="El Encanto"
        >
          {LOGO_PATHS.map((d, index) => (
            <path
              key={index}
              ref={(el) => {
                pathRefs.current[index] = el
              }}
              className="map-intro__path"
              d={d}
            />
          ))}
        </svg>
        <p className="map-intro__brand">El Encanto</p>
      </div>
    </div>
  )
}

export default MapIntro
