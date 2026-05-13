exports.up = (pgm) => {
  pgm.createTable('request_history', {
    id: { type: 'serial', primaryKey: true },
    request_id: {
      type: 'integer',
      references: '"requests"',
      onDelete: 'CASCADE',
    },
    old_status: { type: 'varchar(20)' },
    new_status: { type: 'varchar(20)', notNull: true },
    changed_by: { type: 'integer', references: '"users"' },
    comment: { type: 'text' },
    created_at: { type: 'timestamp', default: pgm.func('NOW()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('request_history')
}
