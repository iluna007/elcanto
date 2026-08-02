import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedProperties } from '../i18n/helpers'

function ProjectHeroSlider() {
  const { lang, t } = useLanguage()
  const properties = getLocalizedProperties(lang)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [lang])

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % properties.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [properties.length])

  const project = properties[active]

  return (
    <section className="project-hero-slider">
      {properties.map((item, index) => (
        <div
          key={item.id}
          className={`project-hero-slider__slide ${index === active ? 'is-active' : ''}`}
        >
          {(index === active || index === (active + 1) % properties.length) && (
            <img
              src={item.heroImage}
              alt=""
              loading={index === active ? 'eager' : 'lazy'}
              fetchPriority={index === active ? 'high' : 'low'}
              decoding="async"
            />
          )}
        </div>
      ))}

      <div className="project-hero-slider__overlay" />

      <div className="project-hero-slider__content">
        <p className="project-hero-slider__eyebrow">{t.projects.selectProject}</p>
        <h2 className="project-hero-slider__title">{project.name}</h2>
        <p className="project-hero-slider__location">{project.location}</p>
        <div className="project-hero-slider__actions">
          <Link to={project.link} className="project-link">
            {t.projects.viewProject}
          </Link>
          <a href="#all-projects" className="project-link project-link--muted">
            {t.projects.allProjects}
          </a>
        </div>
      </div>

      <div className="project-hero-slider__dots">
        {properties.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === active ? 'is-active' : ''}
            aria-label={t.projects.viewProjectAria.replace('{name}', item.name)}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectHeroSlider
