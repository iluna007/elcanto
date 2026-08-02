import { useLanguage } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import ContactBackground from '../components/ContactBackground'
import { properties } from '../data/properties'

const CONTACT = {
  email: 'info@elencantodelsur.com',
  phoneNi: { display: '(505) 8564-0945', tel: '+50585640945' },
  phoneUs: { display: '(415) 819-2555', tel: '+14158192555' },
  facebook: 'https://www.facebook.com/ElEncantoDelSur/',
  instagram: 'https://www.instagram.com/elencantodelsur/',
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.017 7.052.08 5.771.143 4.659.388 3.678 1.37 2.697 2.35 2.452 3.463 2.39 4.744 2.327 6.024 2.31 6.433 2.31 12c0 5.567.017 5.976.08 7.256.062 1.281.307 2.394 1.288 3.375.981.981 2.094 1.226 3.375 1.288C8.332 23.983 8.741 24 12 24s3.668-.017 4.948-.08c1.281-.062 2.394-.307 3.375-1.288.981-.981 1.226-2.094 1.288-3.375.063-1.28.08-1.689.08-7.256 0-5.567-.017-5.976-.08-7.256-.062-1.281-.307-2.394-1.288-3.375-.981-.981-2.094-1.226-3.375-1.288C15.668.017 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  )
}

function ContactPage() {
  const { t } = useLanguage()

  usePageMeta({ title: t.meta.contactTitle, description: t.meta.contactDescription })

  return (
    <div className="contact-page">
      <ContactBackground />

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
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>
              {t.contact.phoneNi}:{' '}
              <a href={`tel:${CONTACT.phoneNi.tel}`}>{CONTACT.phoneNi.display}</a>
            </p>
            <p>
              {t.contact.phoneUs}:{' '}
              <a href={`tel:${CONTACT.phoneUs.tel}`}>{CONTACT.phoneUs.display}</a>
            </p>
            <div className="contact-card__social">
              <p className="contact-card__social-label">{t.contact.socialTitle}</p>
              <div className="contact-card__social-links">
                <a
                  href={CONTACT.facebook}
                  className="contact-card__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.contact.facebook}
                >
                  <FacebookIcon />
                </a>
                <a
                  href={CONTACT.instagram}
                  className="contact-card__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.contact.instagram}
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>
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
