exports.up = (pgm) => {
  pgm.createTable('requests', {
    id: { type: 'serial', primaryKey: true },
    title: { type: 'varchar(200)', notNull: true },
    description: { type: 'text' },
    status: { type: 'varchar(20)', notNull: true, default: 'pending' },
    user_id: { type: 'integer', references: '"users"' },
    area_id: { type: 'integer', references: '"areas"' },
    category_id: {
      type: 'integer',
      references: '"categories"',
      onDelete: 'SET NULL',
    },
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },
    updated_at: { type: 'timestamp', default: pgm.func('NOW()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('requests')
}
