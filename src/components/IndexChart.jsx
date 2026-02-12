import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { fetchIndexHistory, INDEX_NAMES, INDEX_COLORS } from '../api/moex'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function IndexChart({ indexId, days = 90 }) {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastValue, setLastValue] = useState(null)
  const [change, setChange] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const rows = await fetchIndexHistory(indexId, days)
        if (cancelled) return

        if (rows.length === 0) {
          setError('Нет данных')
          setLoading(false)
          return
        }

        const labels = rows.map(r => {
          const d = r.TRADEDATE || r.tradedate
          return d ? d.slice(5) : ''
        })

        const values = rows.map(r => {
          return r.CLOSE || r.close || 0
        })

        const last = values[values.length - 1]
        const prev = values.length > 1 ? values[values.length - 2] : last
        setLastValue(last)
        setChange(prev ? ((last - prev) / prev * 100).toFixed(2) : 0)

        const color = INDEX_COLORS[indexId] || '#1a56db'

        setChartData({
          labels,
          datasets: [{
            label: INDEX_NAMES[indexId] || indexId,
            data: values,
            borderColor: color,
            backgroundColor: color + '15',
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2,
          }],
        })
      } catch (err) {
        if (!cancelled) setError('Ошибка загрузки данных')
      }
      if (!cancelled) setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [indexId, days])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleFont: { size: 12 },
        bodyFont: { size: 13, weight: 600 },
        padding: 10,
        cornerRadius: 6,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: '#9ca3af', maxTicksLimit: 8 },
      },
      y: {
        grid: { color: '#f3f4f6' },
        ticks: { font: { size: 11 }, color: '#9ca3af' },
      },
    },
  }

  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <div>
          <h3 className="chart-card__title">{INDEX_NAMES[indexId] || indexId}</h3>
          {lastValue != null && (
            <div className="chart-card__value">
              <span className="chart-card__price">{lastValue.toLocaleString('ru-RU')}</span>
              {change != null && (
                <span className={`chart-card__change ${Number(change) >= 0 ? 'chart-card__change--up' : 'chart-card__change--down'}`}>
                  {Number(change) >= 0 ? '+' : ''}{change}%
                </span>
              )}
            </div>
          )}
        </div>
        <span className="chart-card__period">{days} дней</span>
      </div>

      <div className="chart-card__body">
        {loading && <div className="chart-card__loading">Загрузка...</div>}
        {error && <div className="chart-card__error">{error}</div>}
        {chartData && !loading && (
          <div style={{ height: 220 }}>
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  )
}
