import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О бирже' },
  { to: '/auctions', label: 'Товарные аукционы' },
  { to: '/otc', label: 'Регистрация договоров' },
  { to: '/news', label: 'Новости' },
  { to: '/disclosure', label: 'Раскрытие информации' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="header" style={scrolled ? { boxShadow: '0 2px 8px rgba(0,0,0,.06)' } : undefined}>
      <div className="container header__inner">
        <NavLink to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo__icon">НТБ</span>
          <span className="logo__text">Национальная<br />Товарная Биржа</span>
        </NavLink>

        <nav className={`nav${menuOpen ? ' nav--open' : ''}`}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <div className="lang-switch">
            <a href="#" className="lang-switch__link lang-switch__link--active">Ru</a>
            <a href="#" className="lang-switch__link">En</a>
          </div>
          <a href="#" className="btn btn--outline btn--sm">Личный кабинет</a>
          <button
            className={`burger${menuOpen ? ' burger--active' : ''}`}
            aria-label="Меню"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
