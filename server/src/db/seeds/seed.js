require('dotenv').config()
const pool = require('../../config/db')

async function seed() {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Users — passwords are bcrypt hash of "password"
    const usersResult = await client.query(`
      INSERT INTO users (name, email, password, role) VALUES
        ('Admin Sistema',   'admin@example.com',  '$2a$10$WkJQkBPBS5foEwkD5TR.l.VjHLczdpo47gQldtmaRyDeGwMA3Rgcq', 'admin'),
        ('Alice User',      'alice@example.com',    '$2a$10$WkJQkBPBS5foEwkD5TR.l.VjHLczdpo47gQldtmaRyDeGwMA3Rgcq', 'user'),
        ('Bob User',    'bob@example.com', '$2a$10$WkJQkBPBS5foEwkD5TR.l.VjHLczdpo47gQldtmaRyDeGwMA3Rgcq', 'user'),
        ('Charlie User',    'charlie@example.com',  '$2a$10$WkJQkBPBS5foEwkD5TR.l.VjHLczdpo47gQldtmaRyDeGwMA3Rgcq', 'user')
      RETURNING id
    `)
    const [adminId, anaId, carlosId, mariaId] = usersResult.rows.map(r => r.id)

    // Areas
    const areasResult = await client.query(`
      INSERT INTO areas (name, description) VALUES
        ('Soporte TI',        'Gestión de incidencias y requerimientos tecnológicos'),
        ('Recursos Humanos',  'Solicitudes de personal, permisos y beneficios'),
        ('Facilities',        'Mantenimiento, espacios y servicios generales')
      RETURNING id
    `)
    const [tiId, rrhhId, facilitiesId] = areasResult.rows.map(r => r.id)

    // User ↔ Area assignments
    await client.query(`
      INSERT INTO user_areas (user_id, area_id) VALUES
        ($1, $2), ($1, $3),
        ($4, $2),
        ($5, $3), ($5, $2)
    `, [anaId, tiId, rrhhId, carlosId, mariaId])

    // Categories
    const catsResult = await client.query(`
      INSERT INTO categories (name, area_id) VALUES
        ('Hardware',            $1),
        ('Software',            $1),
        ('Accesos y permisos',  $1),
        ('Permisos laborales',  $2),
        ('Incorporación',       $2),
        ('Reparaciones',        $3),
        ('Limpieza',            $3)
      RETURNING id
    `, [tiId, rrhhId, facilitiesId])
    const [hwId, swId, accId, permId, incId, repId, limId] = catsResult.rows.map(r => r.id)

    // Requests in various states
    await client.query(`
      INSERT INTO requests (title, description, status, user_id, area_id, category_id) VALUES
        ('Laptop no enciende',          'La laptop del puesto 12 no arranca desde ayer', 'pending',   $1, $2, $3),
        ('Instalar VS Code',            'Necesito VS Code en mi equipo de desarrollo',   'in_review', $1, $2, $4),
        ('Acceso a repositorio GitHub', 'Requiero acceso al org de GitHub de la empresa','approved',  $5, $2, $5),
        ('Permiso día viernes',         'Solicito permiso el viernes 16 por trámite médico', 'pending', $6, $7, $8),
        ('Onboarding nuevo integrante', 'Setup inicial para Juan Pérez que ingresa lunes',  'approved', $1, $7, $9),
        ('Reparar silla oficina 3',     'Silla rota en sala de reuniones piso 3',         'in_review', $5, $10, $11),
        ('Reposición de insumos',       'Faltan hojas y cartuchos de impresora',          'rejected',  $6, $10, $12),
        ('Cambio de contraseña AD',     'Usuario bloqueado, necesita reset de contraseña','cancelled', $5, $2, $5)
    `, [anaId, tiId, hwId, swId, carlosId, mariaId, rrhhId, permId, incId, facilitiesId, repId, limId])

    await client.query('COMMIT')
    console.log('Seed completado.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Error en seed:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
