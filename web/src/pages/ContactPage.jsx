import { useLanguage } from '../i18n/LanguageContext'
import { properties } from '../data/properties'

const contactVideoSrc =
  import.meta.env.VITE_CONTACT_VIDEO_URL || '/videos/el-encanto-drone.mp4'

const POSTER = '/marketing/encanto-sunset.webp'

function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="contact-page">
      <video
        className="contact-page__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={contactVideoSrc} type="video/mp4" />
      </video>

      <div className="contact-page__overlay" />

      <div className="contact-page__content">
        <header className="contact-page__header">
          <h1>{t.contact.title}</h1>
          <p>{t.contact.subtitle}</p>
        </header>

        <div className="contact-grid">
          <section className="contact-card">
            <h2>{t.contact.infoTitle}</h2>
            <p>
              <strong>El Encanto</strong>
            </p>
            <p>Nacascolo, Rivas, Nicaragua</p>
            <p>
              <a href="mailto:info@elencanto.com">info@elencanto.com</a>
            </p>
            <p>+505 0000 0000</p>
          </section>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <h2>{t.contact.formTitle}</h2>
            <label>
              {t.contact.name}
              <input type="text" placeholder={t.contact.namePlaceholder} autoComplete="name" />
            </label>
            <label>
              {t.contact.email}
              <input type="email" placeholder={t.contact.emailPlaceholder} autoComplete="email" />
            </label>
            <label>
              {t.contact.property}
              <select defaultValue="">
                <option value="" disabled>
                  {t.contact.propertyPlaceholder}
                </option>
                {properties.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t.contact.message}
              <textarea rows={5} placeholder={t.contact.messagePlaceholder} />
            </label>
            <button type="submit">{t.contact.submit}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
