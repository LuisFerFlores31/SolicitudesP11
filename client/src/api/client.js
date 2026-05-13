const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const err = new Error(body.error || `Error ${res.status}`)
    err.status = res.status
    throw err
  }

  return res.json()
}

export const get = (path) => request(path)
export const post = (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) })
export const put = (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) })
export const del = (path) => request(path, { method: 'DELETE' })
