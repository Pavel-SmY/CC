import { Link } from 'react-router-dom'

export default function PageHeader({ title, breadcrumb }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="page-header__breadcrumb">
          <Link to="/">Главная</Link> / {breadcrumb || title}
        </p>
        <h1 className="page-header__title">{title}</h1>
      </div>
    </section>
  )
}
