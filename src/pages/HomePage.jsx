import { Link } from 'react-router-dom'

const stats = [
  { value: 'с 2002', label: 'года работы' },
  { value: '20+', label: 'лет на рынке' },
  { value: '100+', label: 'участников торгов' },
]

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 5-8" />
      </svg>
    ),
    title: 'Товарные аукционы',
    desc: 'Биржевые торги сельхозпродукцией: зерновые, сахар, молочная продукция и другие товары АПК',
    to: '/auctions',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 3v18" />
      </svg>
    ),
    title: 'Государственные интервенции',
    desc: 'Проведение государственных товарных и закупочных интервенций на рынке зерна',
    to: '/auctions',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
      </svg>
    ),
    title: 'Регистрация договоров',
    desc: 'Регистрация внебиржевых договоров с товаром через личный кабинет на бирже',
    to: '/otc',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: 'Индексы и аналитика',
    desc: 'Расчёт индексов рынка зерновых культур и аналитические данные по товарному рынку',
    to: '/disclosure',
  },
]

const news = [
  { date: '10.02.2026', title: 'Итоги торгов на товарном рынке за январь 2026 года', excerpt: 'Подведены итоги биржевых торгов на товарных аукционах АО НТБ за первый месяц 2026 года.' },
  { date: '05.02.2026', title: 'Обновление правил допуска участников к торгам', excerpt: 'Внесены изменения в порядок допуска участников к организованным торгам на товарном рынке.' },
  { date: '28.01.2026', title: 'Расширение перечня товаров для биржевых торгов', excerpt: 'АО НТБ расширяет список товаров, доступных для совершения сделок на организованных торгах.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">Национальная товарная биржа</h1>
            <p className="hero__subtitle">
              Организатор биржевого товарного рынка России. Проведение товарных аукционов,
              государственных интервенций на рынке зерна, регистрация внебиржевых договоров.
            </p>
            <div className="hero__actions">
              <Link to="/auctions" className="btn btn--white btn--lg">Товарные аукционы</Link>
              <Link to="/about" className="btn btn--outline-light btn--lg">О бирже</Link>
            </div>
          </div>
          <div className="hero__stats">
            {stats.map(s => (
              <div className="stat-card" key={s.label}>
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">Направления деятельности</h2>
          <div className="services__grid">
            {services.map(s => (
              <Link to={s.to} className="service-card" key={s.title}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <span className="service-card__link">Подробнее &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="about-preview">
        <div className="container about-preview__inner">
          <div className="about-preview__text">
            <h2 className="section-title section-title--left">О бирже</h2>
            <p>
              АО «Национальная товарная биржа» учреждено в 2002 году и входит в Группу
              «Московская Биржа». Является уполномоченной биржей Минсельхоза России.
            </p>
            <ul className="about-preview__list">
              <li>Лицензия биржи ЦБ РФ № 045-008</li>
              <li>Группа «Московская Биржа»</li>
              <li>Уполномоченная биржа Минсельхоза России</li>
              <li>Организатор товарного рынка с 2002 года</li>
            </ul>
            <Link to="/about" className="btn btn--primary btn--md">Подробнее о бирже</Link>
          </div>
          <div className="about-preview__visual">
            <div className="info-block">
              <div className="info-block__item">
                <div className="info-block__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></svg>
                </div>
                <span className="info-block__text">Лицензия ЦБ РФ</span>
              </div>
              <div className="info-block__item">
                <div className="info-block__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" /></svg>
                </div>
                <span className="info-block__text">Группа «Московская Биржа»</span>
              </div>
              <div className="info-block__item">
                <div className="info-block__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                </div>
                <span className="info-block__text">Уполномоченная биржа Минсельхоза</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="news-preview">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Новости</h2>
            <Link to="/news" className="section-more">Все новости &rarr;</Link>
          </div>
          <div className="news-grid">
            {news.map(n => (
              <article className="news-card" key={n.date}>
                <span className="news-card__date">{n.date}</span>
                <h3 className="news-card__title">{n.title}</h3>
                <p className="news-card__excerpt">{n.excerpt}</p>
                <span className="news-card__link">Читать &rarr;</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta__inner">
            <h2 className="cta__title">Начните работу с биржей</h2>
            <p className="cta__text">
              Получите доступ к торгам или зарегистрируйте внебиржевой договор.
              Техподдержка:&nbsp;
              <a href="mailto:help@moex.com">help@moex.com</a>
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/auctions" className="btn btn--white btn--lg">Участвовать в торгах</Link>
              <Link to="/otc" className="btn btn--outline-light btn--lg">Регистрация договоров</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
