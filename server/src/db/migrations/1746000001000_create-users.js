exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(150)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
    role: { type: 'varchar(20)', notNull: true, default: 'user' },
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('users')
}
