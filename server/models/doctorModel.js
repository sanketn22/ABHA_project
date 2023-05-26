const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Doctor',
  tableName: 'doctor',
  columns: {
    doctor_id: {
      primary: true,
      type: 'int',
      generated: false,
    },
    doctor_name: {
      type: 'varchar',
      nullable: true,
    },
    specialization: {
      type: 'varchar',
      nullable: true,
    },
    contact_no: {
      type: 'varchar',
      nullable: true,
    },
    gender: {
      type: 'varchar',
      nullable: true,
    },
    address: {
      type: 'varchar',
      nullable: true,
    },
  }
});
