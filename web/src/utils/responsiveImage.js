export const IMAGE_WIDTHS = [640, 1200, 2400]

/** @param {string} src e.g. /casas/bungalow-hero.webp */
export function getResponsiveImageProps(src) {
  if (!src || typeof src !== 'string') {
    return { src: src || '', srcSet: undefined }
  }

  if (!src.endsWith('.webp')) {
    return { src, srcSet: undefined }
  }

  const base = src.replace(/\.webp$/, '').replace(/-\d+w$/, '')
  const srcSet = IMAGE_WIDTHS.map((w) => `${base}-${w}w.webp ${w}w`).join(', ')

  return {
    src,
    srcSet,
  }
}

export const IMAGE_SIZES = {
  hero: '100vw',
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px',
  gallery: '(max-width: 768px) 100vw,  min(800px, 70vw)',
  aboutSection: '(max-width: 768px) 100vw, min(560px, 45vw)',
  aboutGallery: '(max-width: 480px) 100vw, (max-width: 900px) 50vw, 400px',
  floorPlan: '(max-width: 768px) 100vw, min(900px, 80vw)',
}
