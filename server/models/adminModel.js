const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Admin',
  tableName: 'admin',
  columns: {
    emailid: {
      primary: true,
      type: 'varchar',
      generated: false,
    },
    name: {
      type: 'varchar',
      nullable: true,
    },
    password: {
      type: 'varchar',
      nullable: false,
    },
}
});
