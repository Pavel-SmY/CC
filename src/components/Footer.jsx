import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <div className="logo logo--footer">
              <span className="logo__icon">НТБ</span>
              <span className="logo__text">Национальная<br />Товарная Биржа</span>
            </div>
            <p className="footer__desc">
              АО «Национальная товарная биржа» — организатор биржевого товарного рынка
              России, входит в Группу «Московская Биржа».
            </p>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__heading">Навигация</h4>
            <nav className="footer__nav">
              <Link to="/about">О бирже</Link>
              <Link to="/auctions">Товарные аукционы</Link>
              <Link to="/otc">Регистрация договоров</Link>
              <Link to="/news">Новости</Link>
              <Link to="/disclosure">Раскрытие информации</Link>
            </nav>
          </div>

          <div className="footer__nav-col">
            <h4 className="footer__heading">Документы</h4>
            <nav className="footer__nav">
              <a href="#">Правила торгов</a>
              <a href="#">Тарифы</a>
              <a href="#">Кодекс этики</a>
              <a href="#">Политика непрерывности</a>
            </nav>
          </div>

          <div className="footer__contact">
            <h4 className="footer__heading">Контакты</h4>
            <p><a href="mailto:namex@namex.org">namex@namex.org</a></p>
            <p><a href="mailto:help@moex.com">help@moex.com</a> (техподдержка)</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2002&ndash;2026 АО «Национальная товарная биржа». Лицензия биржи № 045-008.</p>
        </div>
      </div>
    </footer>
  )
}
