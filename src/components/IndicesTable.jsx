import { useState, useEffect } from 'react'
import { fetchAllIndices, INDEX_NAMES } from '../api/moex'

export default function IndicesTable() {
  const [indices, setIndices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const rows = await fetchAllIndices()
        if (cancelled) return

        // Group by index id, take latest date for each
        const latest = {}
        rows.forEach(row => {
          const id = row.indexid || row.INDEXID
          if (!latest[id] || (row.tradedate || row.TRADEDATE) > (latest[id].tradedate || latest[id].TRADEDATE)) {
            latest[id] = row
          }
        })
        setIndices(Object.values(latest))
      } catch {
        if (!cancelled) setError('Не удалось загрузить индексы')
      }
      if (!cancelled) setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <div className="chart-card"><div className="chart-card__loading">Загрузка индексов...</div></div>
  if (error) return <div className="chart-card"><div className="chart-card__error">{error}</div></div>
  if (indices.length === 0) return null

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">Товарные индексы НТБ</h3>
        <span className="chart-card__period">Текущие значения</span>
      </div>
      <div className="chart-card__body">
        <table className="indices-table">
          <thead>
            <tr>
              <th>Индекс</th>
              <th>Значение</th>
              <th>Изменение</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {indices.map(row => {
              const id = row.indexid || row.INDEXID
              const value = row.close || row.value || row.CLOSE || row.VALUE
              const prev = row.open || row.OPEN || value
              const change = prev ? ((value - prev) / prev * 100).toFixed(2) : '0.00'
              const date = row.tradedate || row.TRADEDATE || ''
              const name = INDEX_NAMES[id] || id

              return (
                <tr key={id}>
                  <td>
                    <span className="indices-table__name">{name}</span>
                    <span className="indices-table__ticker">{id}</span>
                  </td>
                  <td className="indices-table__value">{value != null ? Number(value).toLocaleString('ru-RU') : '—'}</td>
                  <td>
                    <span className={`chart-card__change ${Number(change) >= 0 ? 'chart-card__change--up' : 'chart-card__change--down'}`}>
                      {Number(change) >= 0 ? '+' : ''}{change}%
                    </span>
                  </td>
                  <td className="indices-table__date">{date.slice(5)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
