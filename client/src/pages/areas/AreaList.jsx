import { useState, useEffect } from 'react'
import { getAreas, createArea, deleteArea } from '../../api/areas.api'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'

export default function AreaList() {
  const { user } = useAuth()
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ name: '', description: '' })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getAreas()
      .then(setAreas)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(e) {
    e.preventDefault()
    setAdding(true)
    try {
      const created = await createArea(form)
      setAreas((prev) => [...prev, created])
      setForm({ name: '', description: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar esta área?')) return
    try {
      await deleteArea(id)
      setAreas((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Áreas</h1>
      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {user?.role === 'admin' && (
        <form onSubmit={handleCreate} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Nombre</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Descripción</label>
            <input
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" disabled={adding}>Agregar</Button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Cargando...</p>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {areas.length === 0 && <p className="p-4 text-sm text-gray-500">No hay áreas.</p>}
          {areas.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-gray-800 text-sm">{a.name}</p>
                {a.description && <p className="text-xs text-gray-400">{a.description}</p>}
              </div>
              {user?.role === 'admin' && (
                <Button variant="danger" onClick={() => handleDelete(a.id)}>Eliminar</Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
