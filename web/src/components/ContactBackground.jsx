import { useEffect, useRef, useState } from 'react'

const VIDEOS = ['/videos/el-encanto-drone.mp4', '/videos/el-encanto-drone-source.mp4']

function ContactBackground() {
  const videoRef = useRef(null)
  const [srcIndex, setSrcIndex] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.muted = true
    video.defaultMuted = true

    const play = () => {
      video.play().catch(() => {})
    }

    video.addEventListener('canplay', play)
    video.addEventListener('loadeddata', play)
    play()

    return () => {
      video.removeEventListener('canplay', play)
      video.removeEventListener('loadeddata', play)
      video.pause()
    }
  }, [srcIndex])

  const handleError = () => {
    setSrcIndex((current) => (current < VIDEOS.length - 1 ? current + 1 : current))
  }

  return (
    <video
      ref={videoRef}
      key={VIDEOS[srcIndex]}
      className="contact-page__media"
      src={import.meta.env.VITE_CONTACT_VIDEO_URL || VIDEOS[srcIndex]}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={handleError}
    />
  )
}

export default ContactBackground
