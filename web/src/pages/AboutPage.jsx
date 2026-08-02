import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ResponsiveImage from '../components/ResponsiveImage'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { IMAGE_SIZES } from '../utils/responsiveImage'
import '../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

const sectionImages = [
  { image: '/marketing/view-nacascolo.webp', extraImage: null },
  { image: '/marketing/encanto-green.webp', extraImage: null },
  { image: '/marketing/lifestyle.webp', extraImage: '/marketing/surf.webp' },
  { image: '/marketing/drone-phase.webp', extraImage: null },
]

const galleryImages = [
  '/marketing/view-nacascolo.webp',
  '/marketing/encanto-green.webp',
  '/marketing/lifestyle.webp',
  '/marketing/surf.webp',
  '/marketing/drone-phase.webp',
  '/marketing/lifestyle-horse.webp',
]

function AboutPage() {
  const pageRef = useRef(null)
  const { t } = useLanguage()

  usePageMeta({ title: t.meta.aboutTitle, description: t.meta.aboutDescription })

  useEffect(() => {
    const root = pageRef.current
    if (!root) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.about-hero__content > *', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.to('.about-hero__image', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.utils.toArray('.about-section').forEach((section) => {
        const text = section.querySelector('.about-section__text')
        const media = section.querySelector('.about-section__media')

        gsap.from(text, {
          x: section.classList.contains('about-section--reverse') ? 60 : -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(media, {
          x: section.classList.contains('about-section--reverse') ? -60 : 60,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        section.querySelectorAll('.about-section__float').forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      })

      gsap.utils.toArray('.about-gallery__item').forEach((item, i) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.08,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      gsap.from('.about-cta', {
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.about-cta',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, root)

    const refresh = () => ScrollTrigger.refresh()

    requestAnimationFrame(() => {
      requestAnimationFrame(refresh)
    })

    const images = root.querySelectorAll('img')
    let pending = 0
    images.forEach((img) => {
      if (img.complete) return
      pending += 1
      img.addEventListener('load', () => {
        pending -= 1
        if (pending <= 0) refresh()
      }, { once: true })
    })

    window.addEventListener('load', refresh)
    const timer = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return (
    <div className="about-page" ref={pageRef}>
      <section className="about-hero">
        <ResponsiveImage
          src="/marketing/encanto-sunset.webp"
          alt={t.about.heroImageAlt}
          className="about-hero__image"
          sizes={IMAGE_SIZES.hero}
          loading="eager"
          fetchPriority="high"
        />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">{t.about.heroEyebrow}</p>
          <h1>{t.about.heroTitle}</h1>
          <p>{t.about.heroText}</p>
        </div>
      </section>

      {t.about.sections.map((section, index) => {
        const images = sectionImages[index]
        return (
          <section
            key={section.id}
            className={`about-section ${section.reverse ? 'about-section--reverse' : ''}`}
          >
            <div className="about-section__text">
              <p className="about-section__eyebrow">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
            <div className="about-section__media">
              <ResponsiveImage
                src={images.image}
                alt={section.imageAlt}
                className="about-section__main"
                sizes={IMAGE_SIZES.aboutSection}
                loading="lazy"
              />
              {images.extraImage && (
                <ResponsiveImage
                  src={images.extraImage}
                  alt={section.extraImageAlt}
                  className="about-section__float about-section__float--one"
                  sizes="280px"
                  loading="lazy"
                />
              )}
              {section.id === 'lifestyle' && (
                <ResponsiveImage
                  src="/marketing/lifestyle-horse.webp"
                  alt={section.floatAlt}
                  className="about-section__float about-section__float--two"
                  sizes="280px"
                  loading="lazy"
                />
              )}
            </div>
          </section>
        )
      })}

      <section className="about-gallery">
        <div className="about-gallery__header">
          <p className="about-section__eyebrow">{t.about.galleryEyebrow}</p>
          <h2>{t.about.galleryTitle}</h2>
        </div>
        <div className="about-gallery__grid">
          {galleryImages.map((src) => (
            <div key={src} className="about-gallery__item">
              <ResponsiveImage
                src={src}
                alt={t.about.galleryImageAlt}
                sizes={IMAGE_SIZES.aboutGallery}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <h2>{t.about.ctaTitle}</h2>
        <p>{t.about.ctaText}</p>
        <div className="about-cta__actions">
          <Link to="/proyectos" className="about-cta__btn">
            {t.about.ctaProjects}
          </Link>
          <Link to="/contacto" className="about-cta__btn about-cta__btn--ghost">
            {t.about.ctaContact}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
