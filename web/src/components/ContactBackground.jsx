import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { getResponsiveImageProps, IMAGE_SIZES } from '../utils/responsiveImage'

const CONTACT_VIDEO_SOURCE = '/videos/el-encanto-drone-source.mp4'
const CONTACT_VIDEO_FALLBACK = '/videos/el-encanto-drone.mp4'

const contactVideoSrc = import.meta.env.VITE_CONTACT_VIDEO_URL || CONTACT_VIDEO_SOURCE

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
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || loadFailed) return undefined

    const video = videoRef.current
    if (!video) return undefined

    video.defaultMuted = true
    video.muted = true

    const tryPlay = () => {
      if (document.hidden) return
      video.play().catch(() => {
        // Autoplay can fail until the browser has buffered enough data — keep the
        // video element mounted and retry on later media events instead of falling
        // back to a static poster.
      })
    }

    const onCanPlay = () => tryPlay()
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
        return
      }
      tryPlay()
    }

    tryPlay()
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onCanPlay)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onCanPlay)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.pause()
    }
  }, [prefersReducedMotion, loadFailed])

  if (prefersReducedMotion || loadFailed) {
    return <ContactPoster />
  }

  const { src: posterSrc } = getResponsiveImageProps(POSTER)

  return (
    <video
      ref={videoRef}
      className="contact-page__media"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterSrc}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      onError={() => setLoadFailed(true)}
    >
      {!import.meta.env.VITE_CONTACT_VIDEO_URL && (
        <>
          <source src={CONTACT_VIDEO_SOURCE} type="video/mp4" />
          <source src={CONTACT_VIDEO_FALLBACK} type="video/mp4" />
        </>
      )}
      {import.meta.env.VITE_CONTACT_VIDEO_URL && (
        <source src={contactVideoSrc} type="video/mp4" />
      )}
    </video>
  )
}

export default ContactBackground
