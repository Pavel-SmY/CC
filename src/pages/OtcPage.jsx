import PageHeader from '../components/PageHeader'

const steps = [
  { title: 'Регистрация', text: 'Получите доступ к личному кабинету на сайте АО НТБ' },
  { title: 'Подача данных', text: 'Заполните информацию о внебиржевом договоре в личном кабинете' },
  { title: 'Регистрация договора', text: 'Договор регистрируется на бирже и получает уникальный номер' },
]

const features = [
  { title: 'Регистрация договоров', text: 'Подача и регистрация внебиржевых договоров с товаром в электронном виде' },
  { title: 'Редактирование отчётов', text: 'Возможность редактирования ранее поданных отчётов о внебиржевых договорах' },
  { title: 'История операций', text: 'Просмотр истории всех зарегистрированных договоров и поданных отчётов' },
  { title: 'Техническая поддержка', text: <>Обращения в техподдержку: <a href="mailto:help@moex.com">help@moex.com</a></> },
]

export default function OtcPage() {
  return (
    <>
      <PageHeader title="Регистрация внебиржевых договоров" breadcrumb="Регистрация договоров" />

      <section className="content-section">
        <div className="container">
          <h3>О сервисе</h3>
          <p>
            АО НТБ предоставляет сервис регистрации внебиржевых договоров с товаром.
            Взаимодействие с Биржей происходит через личный кабинет, где участники могут
            регистрировать внебиржевые договоры и редактировать отчёты о них.
          </p>
          <div className="steps">
            {steps.map(s => (
              <div className="step" key={s.title}>
                <div className="step__title">{s.title}</div>
                <div className="step__text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h3>Возможности личного кабинета</h3>
          <div className="feature-grid">
            {features.map(f => (
              <div className="feature-card" key={f.title}>
                <div className="feature-card__title">{f.title}</div>
                <div className="feature-card__text">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <h3>Контакты</h3>
          <p>По техническим вопросам работы личного кабинета обращайтесь в техподдержку: <a href="mailto:help@moex.com">help@moex.com</a></p>
          <p>По вопросам не технического характера: <a href="mailto:namex@namex.org">namex@namex.org</a></p>
        </div>
      </section>
    </>
  )
}
