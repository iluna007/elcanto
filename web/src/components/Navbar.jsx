import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { properties } from '../data/properties'
import { useLanguage } from '../i18n/LanguageContext'
import { useIsMobile } from '../hooks/useMediaQuery'
import { getActiveProjectSlug } from '../hooks/useProjectTheme'
import '../styles/project-theme.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const { t, toggleLang } = useLanguage()
  const { pathname } = useLocation()
  const isMobile = useIsMobile()
  const activeSlug = getActiveProjectSlug(pathname)

  useEffect(() => {
    setMenuOpen(false)
    setProjectsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleProjects = (event) => {
    if (!isMobile) return
    event.preventDefault()
    setProjectsOpen((prev) => !prev)
  }

  return (
    <nav className="navbar navbar--glass">
      <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
        <img src="/logo-icon.svg" alt="El Encanto" className="navbar__logo" width="38" height="38" />
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

      <button
        type="button"
        className={`navbar__toggle${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="navbar-menu"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        id="navbar-menu"
        className={`navbar__links${menuOpen ? ' is-open' : ''}`}
        onMouseLeave={!isMobile ? () => setProjectsOpen(false) : undefined}
      >
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          {t.nav.map}
        </NavLink>

        <div
          className={`navbar__dropdown${projectsOpen ? ' is-open' : ''}`}
          onMouseEnter={!isMobile ? () => setProjectsOpen(true) : undefined}
        >
          <NavLink
            to="/proyectos"
            className={({ isActive }) =>
              `navbar__dropdown-trigger ${isActive ? 'active' : ''}`
            }
            onClick={toggleProjects}
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
                  onClick={() => {
                    setMenuOpen(false)
                    setProjectsOpen(false)
                  }}
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

      {menuOpen && (
        <button
          type="button"
          className="navbar__backdrop"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
