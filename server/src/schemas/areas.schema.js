const { z } = require('zod')

const createAreaSchema = z.object({
  name: z.string().min(1, 'El nombre del área es requerido'),
})

const updateAreaSchema = z.object({
  name: z.string().min(1, 'El nombre del área es requerido').optional(),
})

module.exports = { createAreaSchema, updateAreaSchema }
