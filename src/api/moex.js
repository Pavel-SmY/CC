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
  const { columns, data } = block
  return data.map(row => {
    const obj = {}
    columns.forEach((col, i) => { obj[col] = row[i] })
    return obj
  })
}

/**
 * Fetch commodity index analytics (WHFOB, SUGR, SOEXP, etc.)
 * Returns last N days of index values
 */
export async function fetchIndexAnalytics(indexId, days = 90) {
  const from = new Date()
  from.setDate(from.getDate() - days)
  const fromStr = from.toISOString().slice(0, 10)

  const url = `${ISS_BASE}/statistics/engines/commodity/markets/index/analytics/${indexId}.json?from=${fromStr}&limit=100&iss.meta=off`
  const data = await fetchJSON(url)

  if (data.analytics) {
    return parseISSTable(data.analytics)
  }
  if (data.indices) {
    return parseISSTable(data.indices)
  }
  return []
}

/**
 * Fetch all commodity indices current values
 */
export async function fetchAllIndices() {
  const url = `${ISS_BASE}/statistics/engines/commodity/markets/index/analytics.json?limit=50&iss.meta=off`
  const data = await fetchJSON(url)

  if (data.analytics) {
    return parseISSTable(data.analytics)
  }
  return []
}

/**
 * Fetch wheat futures (WHEAT) from derivatives market
 */
export async function fetchWheatFutures(days = 180) {
  const from = new Date()
  from.setDate(from.getDate() - days)
  const fromStr = from.toISOString().slice(0, 10)

  const url = `${ISS_BASE}/history/engines/futures/markets/forts/securities.json?security_collection=277&from=${fromStr}&limit=100&iss.meta=off`
  const data = await fetchJSON(url)

  if (data.history) {
    return parseISSTable(data.history)
  }
  return []
}

/**
 * Fetch grain index history (NTB indices page style)
 * Tries multiple known grain-related index tickers
 */
export async function fetchGrainIndices() {
  const indices = ['WHFOB', 'BRLYFOB', 'CRNFOB', 'SUGR', 'SOEXP']
  const results = {}

  await Promise.all(
    indices.map(async (id) => {
      try {
        const data = await fetchIndexAnalytics(id, 90)
        if (data.length > 0) {
          results[id] = data
        }
      } catch {
        // Index may not be available
      }
    })
  )

  return results
}

/**
 * Index display names
 */
export const INDEX_NAMES = {
  WHFOB: 'Пшеница FOB',
  BRLYFOB: 'Ячмень FOB',
  CRNFOB: 'Кукуруза FOB',
  SUGR: 'Сахар',
  SOEXP: 'Подсолнечное масло',
}

export const INDEX_COLORS = {
  WHFOB: '#1a56db',
  BRLYFOB: '#0d9488',
  CRNFOB: '#d97706',
  SUGR: '#dc2626',
  SOEXP: '#7c3aed',
}
