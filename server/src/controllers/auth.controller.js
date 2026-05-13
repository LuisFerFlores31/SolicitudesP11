const bcrypt = require('bcryptjs')
const pool = require('../config/db')

async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' })
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' })

    req.session.userId = user.id
    req.session.userRole = user.role

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

async function logout(req, res) {
  req.session.destroy(() => {
    res.json({ message: 'Sesión cerrada' })
  })
}

async function me(req, res) {
  if (!req.session.userId) return res.status(401).json({ error: 'No autenticado' })

  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.session.userId]
    )
    if (!result.rows[0]) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

module.exports = { login, logout, me }
