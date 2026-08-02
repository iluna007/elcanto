import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setProjectsOpen(false)
  }

  const showProjectsMenu = isMobile ? menuOpen : projectsOpen

  const linksContent = (
    <>
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeMenu}>
        {t.nav.map}
      </NavLink>

      <div
        className={`navbar__dropdown${showProjectsMenu ? ' is-open' : ''}`}
        onMouseEnter={!isMobile ? () => setProjectsOpen(true) : undefined}
        onMouseLeave={!isMobile ? () => setProjectsOpen(false) : undefined}
      >
        <NavLink
          to="/proyectos"
          className={({ isActive }) => `navbar__dropdown-trigger ${isActive ? 'active' : ''}`}
          onClick={closeMenu}
        >
          {t.nav.projects}
          {!isMobile && ' ▾'}
        </NavLink>

        {showProjectsMenu && (
          <div className="navbar__dropdown-menu">
            {properties.map((property) => (
              <Link
                key={property.id}
                to={property.link}
                className={activeSlug === property.slug ? 'active-project' : ''}
                onClick={closeMenu}
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

      <NavLink
        to="/sobre-nosotros"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={closeMenu}
      >
        {t.nav.about}
      </NavLink>

      <NavLink
        to="/contacto"
        className={({ isActive }) => (isActive ? 'active' : '')}
        onClick={closeMenu}
      >
        {t.nav.contact}
      </NavLink>

      <button
        type="button"
        className="navbar__lang"
        onClick={() => {
          toggleLang()
          closeMenu()
        }}
        aria-label={t.nav.langAria}
      >
        {t.nav.langSwitch}
      </button>
    </>
  )

  const mobileMenu =
    isMobile &&
    menuOpen &&
    createPortal(
      <>
        <button
          type="button"
          className="navbar__backdrop"
          aria-label={t.nav.menuClose}
          onClick={closeMenu}
        />
        <div id="navbar-menu" className="navbar__links is-open" role="dialog" aria-modal="true">
          {linksContent}
        </div>
      </>,
      document.body,
    )

  return (
    <nav className={`navbar navbar--glass${menuOpen ? ' navbar--menu-open' : ''}`}>
      <Link to="/" className="navbar__brand" onClick={closeMenu}>
        <img src="/logo-icon.svg" alt="El Encanto" className="navbar__logo" width="36" height="36" />
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
        aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {!isMobile && (
        <div
          id="navbar-menu"
          className="navbar__links"
          onMouseLeave={() => setProjectsOpen(false)}
        >
          {linksContent}
        </div>
      )}

      {mobileMenu}
    </nav>
  )
}

export default Navbar
