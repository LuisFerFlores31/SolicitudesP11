const { ZodError } = require('zod')
const { AppError } = require('../errors/AppError')

function errorHandler(err, req, res, next) {
  console.error(err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.flatten().fieldErrors })
  }

  res.status(500).json({ error: 'Error interno del servidor' })
}

module.exports = { errorHandler }