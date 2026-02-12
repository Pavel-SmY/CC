const ISS_BASE = 'https://iss.moex.com/iss'

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ISS API error: ${res.status}`)
  return res.json()
}

/**
 * Parse ISS table format { columns: [...], data: [[...], ...] } into array of objects
 */
function parseISSTable(block) {
  if (!block || !block.columns || !block.data) return []
  const { columns, data } = block
  return data.map(row => {
    const obj = {}
    columns.forEach((col, i) => { obj[col] = row[i] })
    return obj
  })
}

/**
 * Fetch index history from MOEX ISS
 * Correct endpoint: /history/engines/stock/markets/index/securities/{TICKER}.json
 */
export async function fetchIndexHistory(indexId, days = 90) {
  const from = new Date()
  from.setDate(from.getDate() - days)
  const fromStr = from.toISOString().slice(0, 10)

  // Paginate — ISS returns max 100 rows per request
  let allRows = []
  let start = 0

  while (true) {
    const url = `${ISS_BASE}/history/engines/stock/markets/index/securities/${indexId}.json?from=${fromStr}&start=${start}&iss.meta=off&iss.only=history&history.columns=TRADEDATE,SECID,CLOSE,OPEN,HIGH,LOW,VALUE`
    const data = await fetchJSON(url)
    const rows = parseISSTable(data.history)
    if (rows.length === 0) break
    allRows = allRows.concat(rows)
    if (rows.length < 100) break
    start += 100
  }

  return allRows
}

/**
 * Fetch current values for multiple indices
 */
export async function fetchAllIndices() {
  const tickers = Object.keys(INDEX_NAMES)
  const results = []

  await Promise.all(
    tickers.map(async (id) => {
      try {
        const rows = await fetchIndexHistory(id, 30)
        if (rows.length > 0) {
          const last = rows[rows.length - 1]
          const prev = rows.length > 1 ? rows[rows.length - 2] : last
          results.push({ ...last, _prev: prev })
        }
      } catch {
        // Index may not exist
      }
    })
  )

  return results
}

/**
 * Index display names
 */
export const INDEX_NAMES = {
  WHFOB: 'Пшеница FOB Чёрное море',
  BRLYFOB: 'Ячмень FOB',
  CRNFOB: 'Кукуруза FOB',
  SUGR: 'Сахар',
  SOEXP: 'Подсолнечное масло',
  NWHEAT: 'Пшеница НТБ CPT',
  MLTDRY: 'Сухое молоко',
  BUTTER: 'Масло сливочное',
}

export const INDEX_COLORS = {
  WHFOB: '#1a56db',
  BRLYFOB: '#0d9488',
  CRNFOB: '#d97706',
  SUGR: '#dc2626',
  SOEXP: '#7c3aed',
  NWHEAT: '#2563eb',
  MLTDRY: '#059669',
  BUTTER: '#ea580c',
}
