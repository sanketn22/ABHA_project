const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Medical',
  tableName: 'medical',
  columns: {
    record_id: {
      primary: true,
      type: 'int',
      generated: false,
    },
    abha_id: {
      type: 'varchar',
      nullable: true,
    },
    prescription: {
      type: 'varchar',
      nullable: true,
    },
    diagnosis: {
      type: 'varchar',
      nullable: true,
    },
    doctor_id: {
      type: 'varchar',
      nullable: true,
    },
    lab_reports: {
      type: 'varchar',
      nullable: true,
    },
    date_of_visits: {
        type: 'varchar',
        nullable: true,
    }
  },
  relations: {
    student: {
        target: "student",
        type: "many-to-one",
        joinTable: true,
        cascade: true,
    },
    employee: {
        target: 'employee',
        type: 'many-to-one',
        joinColumn: true,
        cascade: true,
      },
      dependent: {
        target: 'dependent',
        type: 'many-to-one',
        joinColumn: true,
        cascade: true,
      },
      doctor: {
        target: 'doctor',
        type: 'many-to-one',
        joinColumn: true,
        cascade: true,
      }
},

});
