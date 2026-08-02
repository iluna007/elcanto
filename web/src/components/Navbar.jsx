import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { properties } from '../data/properties'
import { useLanguage } from '../i18n/LanguageContext'
import { getActiveProjectSlug } from '../hooks/useProjectTheme'
import '../styles/project-theme.css'

function Navbar() {
  const [projectsOpen, setProjectsOpen] = useState(false)
  const { t, toggleLang } = useLanguage()
  const { pathname } = useLocation()
  const activeSlug = getActiveProjectSlug(pathname)

  return (
    <nav className="navbar navbar--glass">
      <Link to="/" className="navbar__brand">
        <img src="/logo-icon.svg" alt="El Encanto" className="navbar__logo" />
        <span className="navbar__name">El Encanto</span>
        {activeSlug && (
          <span
            className="navbar__project-dot"
            style={{
              background: properties.find((p) => p.slug === activeSlug)?.fillColor,
              boxShadow: `0 0 0 2px ${properties.find((p) => p.slug === activeSlug)?.lineColor}`,
            }}
            aria-hidden="true"
          />
        )}
      </Link>

      <div className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.nav.map}
        </NavLink>

        <div
          className="navbar__dropdown"
          onMouseEnter={() => setProjectsOpen(true)}
          onMouseLeave={() => setProjectsOpen(false)}
        >
          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              `navbar__dropdown-trigger ${isActive ? 'active' : ''}`
            }
          >
            {t.nav.projects} ▾
          </NavLink>
          {projectsOpen && (
            <div className="navbar__dropdown-menu">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  to={property.link}
                  className={activeSlug === property.slug ? 'active-project' : ''}
                >
                  <span
                    className="navbar__dropdown-swatch"
                    style={{
                      background: property.fillColor,
                      boxShadow: `0 0 0 1.5px ${property.lineColor}`,
                    }}
                  />
                  {property.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/sobre-nosotros" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.nav.about}
        </NavLink>

        <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.nav.contact}
        </NavLink>

        <button
          type="button"
          className="navbar__lang"
          onClick={toggleLang}
          aria-label={t.nav.langAria}
        >
          {t.nav.langSwitch}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
