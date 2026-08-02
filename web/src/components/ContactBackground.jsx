import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { getResponsiveImageProps, IMAGE_SIZES } from '../utils/responsiveImage'

const CONTACT_VIDEO_SOURCE = '/videos/el-encanto-drone-source.mp4'
const CONTACT_VIDEO_FALLBACK = '/videos/el-encanto-drone.mp4'

const POSTER = '/marketing/encanto-sunset.webp'

function ContactPoster() {
  const { src, srcSet } = getResponsiveImageProps(POSTER)

  return (
    <img
      className="contact-page__media"
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? IMAGE_SIZES.hero : undefined}
      alt=""
      aria-hidden="true"
      decoding="async"
      fetchPriority="low"
    />
  )
}

function ContactBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const videoRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState(
    () => import.meta.env.VITE_CONTACT_VIDEO_URL || CONTACT_VIDEO_SOURCE,
  )
  const [loadFailed, setLoadFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || loadFailed) return undefined

    const video = videoRef.current
    if (!video) return undefined

    video.defaultMuted = true
    video.muted = true

    const tryPlay = () => {
      if (document.hidden) return
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Retry when more data is buffered.
        })
    }

    const onCanPlay = () => tryPlay()
    const onPlaying = () => setIsPlaying(true)
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
        return
      }
      tryPlay()
    }

    video.load()
    tryPlay()
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('canplaythrough', onCanPlay)
    video.addEventListener('loadeddata', onCanPlay)
    video.addEventListener('playing', onPlaying)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('canplaythrough', onCanPlay)
      video.removeEventListener('loadeddata', onCanPlay)
      video.removeEventListener('playing', onPlaying)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.pause()
    }
  }, [prefersReducedMotion, loadFailed, videoSrc])

  const handleError = () => {
    if (videoSrc === CONTACT_VIDEO_SOURCE && !import.meta.env.VITE_CONTACT_VIDEO_URL) {
      setVideoSrc(CONTACT_VIDEO_FALLBACK)
      setIsPlaying(false)
      return
    }
    setLoadFailed(true)
  }

  if (prefersReducedMotion || loadFailed) {
    return <ContactPoster />
  }

  return (
    <video
      ref={videoRef}
      key={videoSrc}
      className={`contact-page__media${isPlaying ? ' is-playing' : ''}`}
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      onError={handleError}
    />
  )
}

export default ContactBackground
