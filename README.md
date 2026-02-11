# НТБ — Национальная Товарная Биржа

Официальный сайт АО «Национальная товарная биржа» — организатора биржевого товарного рынка России, входящего в Группу «Московская Биржа».

## Запуск

```bash
npm install
npm run dev
```

## Структура проекта

```
src/
├── main.jsx                    # Точка входа, BrowserRouter
├── App.jsx                     # Routes — 6 маршрутов
├── components/
│   ├── Layout.jsx              # Header + Outlet + Footer
│   ├── Header.jsx              # Sticky навигация, бургер-меню
│   ├── Footer.jsx              # Подвал
│   └── PageHeader.jsx          # Заголовок + хлебные крошки
├── pages/
│   ├── HomePage.jsx            # /
│   ├── AboutPage.jsx           # /about
│   ├── AuctionsPage.jsx        # /auctions
│   ├── OtcPage.jsx             # /otc
│   ├── NewsPage.jsx            # /news
│   └── DisclosurePage.jsx      # /disclosure
└── styles/
    └── index.css               # Дизайн-система
```

## Технологии

- React + Vite
- React Router DOM
- Google Fonts (Inter)
- Адаптивная вёрстка (mobile-first)
