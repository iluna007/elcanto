import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectHeroSlider from '../components/ProjectHeroSlider'
import { useLanguage } from '../i18n/LanguageContext'
import { getLocalizedProperties, getStatusFilters, getStatusLabel } from '../i18n/helpers'
import '../styles/projects.css'

function ProjectsPage() {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const properties = getLocalizedProperties(lang)
  const statusFilters = getStatusFilters(lang)

  const filtered =
    filter === 'all' ? properties : properties.filter((p) => p.status === filter)

  return (
    <div className="projects-page">
      <ProjectHeroSlider />

      <section id="all-projects" className="projects-catalog">
        <div className="projects-catalog__header">
          <h1>{t.projects.title}</h1>
          <div className="projects-filters">
            <span className="projects-filters__label">{t.projects.filterLabel}</span>
            {statusFilters.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`projects-filter ${filter === key ? 'is-active' : ''}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
            {filter !== 'all' && (
              <button
                type="button"
                className="projects-filter projects-filter--clear"
                onClick={() => setFilter('all')}
              >
                {t.projects.clearFilters}
              </button>
            )}
          </div>
        </div>

        <div className="projects-grid">
          {filtered.map((property) => (
            <Link
              key={property.id}
              to={property.link}
              className="projects-grid__item"
              style={{
                '--card-fill': property.fillColor,
                '--card-line': property.lineColor,
              }}
            >
              <img src={property.image} alt={property.name} loading="lazy" />
              <div className="projects-grid__overlay">
                <span className="projects-grid__status">
                  {getStatusLabel(property.status, lang)}
                </span>
                <h2>{property.name}</h2>
                <p>{property.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
