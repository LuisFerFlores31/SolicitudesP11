require('dotenv').config()
const { default: run } = require('node-pg-migrate')
const path = require('path')

const direction = process.argv[2] || 'up'

run({
  databaseUrl: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrationsTable: 'pgmigrations',
  dir: path.join(__dirname, 'migrations'),
  direction,
  log: console.log,
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
