exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    area_id: {
      type: 'integer',
      references: '"areas"',
      onDelete: 'SET NULL',
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('categories')
}
