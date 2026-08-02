import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResponsiveImage from '../components/ResponsiveImage'
import ProjectThemeLegend from '../components/ProjectThemeLegend'
import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { getLocalizedProperty, getLocalizedProperties } from '../i18n/helpers'
import { IMAGE_SIZES } from '../utils/responsiveImage'
import '../styles/projects.css'
import '../styles/project-theme.css'

function ProjectDetailPage() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const property = getLocalizedProperty(slug, lang)
  const [activeGallery, setActiveGallery] = useState(0)
  const [activeFloorPlan, setActiveFloorPlan] = useState(0)
  const d = t.projectDetail

  usePageMeta({
    title: property ? `${property.name} | El Encanto` : t.meta.projectsTitle,
    description: property?.description?.slice(0, 160) ?? t.meta.projectsDescription,
  })

  if (!property) {
    return (
      <div className="project-detail">
        <div className="project-detail__section">
          <h1>{d.notFound}</h1>
          <Link to="/proyectos" className="project-link">
            {d.backToAll}
          </Link>
        </div>
      </div>
    )
  }

  const otherProjects = getLocalizedProperties(lang).filter((p) => p.slug !== property.slug)

  const scrollToContent = () => {
    document.getElementById('project-content')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="project-detail project-detail--themed"
      style={{
        '--project-fill': property.fillColor,
        '--project-line': property.lineColor,
        '--project-accent': property.accentColor,
      }}
    >
      <section className="project-detail-hero">
        <ResponsiveImage
          src={property.heroImage}
          alt=""
          className="project-detail-hero__image"
          sizes={IMAGE_SIZES.hero}
          fetchPriority="high"
          loading="eager"
        />
        <div className="project-detail-hero__overlay" />
        <div className="project-detail-hero__content">
          <h1>{property.name}</h1>
          <h2>{property.location}</h2>
          <h3>{property.tagline}</h3>
          <button type="button" className="project-explore-btn" onClick={scrollToContent}>
            {d.explore}
          </button>
        </div>
      </section>

      <div id="project-content">
        <div className="project-detail__theme-bar">
          <ProjectThemeLegend slug={property.slug} />
        </div>

        <section className="project-detail__section project-detail__intro">
          <div className="project-detail__label">{d.projectLabel}</div>
          <div className="project-detail__intro-grid">
            <p className="project-detail__lead">{property.description}</p>
            <div className="project-detail__stats">
              <div>
                <span>{d.totalArea}</span>
                <strong>{property.totalFootage}</strong>
              </div>
              <div>
                <span>{d.interiorArea}</span>
                <strong>{property.acFootage}</strong>
              </div>
              <div>
                <span>{d.price}</span>
                <strong>{property.price}</strong>
              </div>
            </div>
          </div>
        </section>

        {property.floorPlans?.length > 0 && (
          <section className="project-detail__section">
            <h2 className="project-detail__heading">{d.floorPlans}</h2>
            <div className="project-floorplans">
              {property.floorPlans.map((plan, index) => (
                <button
                  key={plan.label}
                  type="button"
                  className={`project-floorplans__tab ${activeFloorPlan === index ? 'is-active' : ''}`}
                  onClick={() => setActiveFloorPlan(index)}
                >
                  {plan.label}
                </button>
              ))}
            </div>
            <ResponsiveImage
              src={property.floorPlans[activeFloorPlan].image}
              alt={property.floorPlans[activeFloorPlan].label}
              className="project-floorplans__image"
              sizes={IMAGE_SIZES.floorPlan}
              loading="lazy"
            />
          </section>
        )}

        <section className="project-detail__section project-detail__details">
          <h2 className="project-detail__heading">{d.details}</h2>
          <div className="project-detail__details-grid">
            <div>
              <strong>{property.bedrooms}</strong>
              <span>{d.bedrooms}</span>
            </div>
            <div>
              <strong>{property.fullBath}</strong>
              <span>{d.fullBaths}</span>
            </div>
            <div>
              <strong>{property.halfBath}</strong>
              <span>{d.halfBaths}</span>
            </div>
          </div>
        </section>

        <section className="project-detail__section">
          <h2 className="project-detail__heading">{d.gallery}</h2>
          <div className="project-gallery">
            <div className="project-gallery__main">
              <ResponsiveImage
                src={property.gallery[activeGallery].src}
                alt={property.gallery[activeGallery].caption}
                sizes={IMAGE_SIZES.gallery}
              />
              <p>{property.gallery[activeGallery].caption}</p>
            </div>
            <div className="project-gallery__thumbs">
              {property.gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  className={activeGallery === index ? 'is-active' : ''}
                  onClick={() => setActiveGallery(index)}
                >
                  <ResponsiveImage
                    src={item.src}
                    alt={item.caption}
                    sizes="120px"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {property.floors?.map((floor) => (
          <section key={floor.name} className="project-detail__section project-detail__floor">
            <h2 className="project-detail__heading">{floor.name}</h2>
            <ul className="project-detail__rooms">
              {floor.rooms.map((room) => (
                <li key={room}>{room}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className="project-detail__section">
          <h2 className="project-detail__heading">{d.mainFeatures}</h2>
          <div className="project-features">
            {property.mainFeatures.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <p className="project-detail__closing">{property.closingText}</p>
        </section>

        <section className="project-detail__section project-detail__location">
          <div className="project-detail__label">{d.location}</div>
          <h2 className="project-detail__heading">{property.location}</h2>
          <p className="project-detail__address">{property.address}</p>

          <div className="project-detail__proximity">
            <div>
              <h3>{d.nearTo}</h3>
              <ul>
                {property.nearTo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{d.closeTo}</h3>
              <ul>
                {property.closeTo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <Link to="/" className="project-link project-link--map">
            {d.viewOnMap}
          </Link>
        </section>

        <section className="project-detail__section project-detail__others">
          <h2 className="project-detail__heading">{d.selectProject}</h2>
          <div className="projects-grid projects-grid--compact">
            {otherProjects.map((item) => (
              <Link key={item.id} to={item.link} className="projects-grid__item">
                <ResponsiveImage
                  src={item.image}
                  alt={item.name}
                  sizes={IMAGE_SIZES.card}
                  loading="lazy"
                />
                <div className="projects-grid__overlay">
                  <h2>{item.name}</h2>
                  <p>{item.location}</p>
                  <span className="project-link">{t.projects.viewProject}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/proyectos" className="project-link project-link--all">
            {t.projects.allProjects}
          </Link>
        </section>

        <section className="project-detail__cta">
          <Link to="/contacto" className="project-explore-btn">
            {d.contactUs}
          </Link>
        </section>
      </div>
    </div>
  )
}

export default ProjectDetailPage
