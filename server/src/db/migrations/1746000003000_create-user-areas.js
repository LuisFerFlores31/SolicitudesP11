exports.up = (pgm) => {
  pgm.createTable('user_areas', {
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    area_id: {
      type: 'integer',
      notNull: true,
      references: '"areas"',
      onDelete: 'CASCADE',
    },
  })
  pgm.addConstraint('user_areas', 'user_areas_pkey', 'PRIMARY KEY (user_id, area_id)')
}

exports.down = (pgm) => {
  pgm.dropTable('user_areas')
}
