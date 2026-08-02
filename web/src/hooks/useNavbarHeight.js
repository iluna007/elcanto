import { useEffect } from 'react'

export function useNavbarHeight() {
  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    if (!navbar) return undefined

    const update = () => {
      document.documentElement.style.setProperty('--navbar-height', `${navbar.offsetHeight}px`)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(navbar)
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])
}
