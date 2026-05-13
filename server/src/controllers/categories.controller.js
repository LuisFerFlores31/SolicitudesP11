const pool = require('../config/db')

async function getAll(req, res) {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

async function getById(req, res) {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id])
    if (!result.rows[0]) return res.status(404).json({ error: 'Categoría no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

async function create(req, res) {
  const { name, area_id } = req.body
  if (!name) return res.status(400).json({ error: 'El nombre es requerido' })

  try {
    const result = await pool.query(
      'INSERT INTO categories (name, area_id) VALUES ($1, $2) RETURNING *',
      [name, area_id || null]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

async function update(req, res) {
  const { name, area_id } = req.body
  if (!name) return res.status(400).json({ error: 'El nombre es requerido' })

  try {
    const result = await pool.query(
      'UPDATE categories SET name = $1, area_id = $2 WHERE id = $3 RETURNING *',
      [name, area_id || null, req.params.id]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Categoría no encontrada' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

async function remove(req, res) {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING id', [req.params.id])
    if (!result.rows[0]) return res.status(404).json({ error: 'Categoría no encontrada' })
    res.json({ message: 'Categoría eliminada' })
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { getAll, getById, create, update, remove }
