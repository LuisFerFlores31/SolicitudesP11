exports.up = (pgm) => {
  pgm.createTable('areas', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    description: { type: 'text' },
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('areas')
}
