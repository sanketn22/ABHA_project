const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Insurance',
  tableName: 'insurance',
  columns: {
    policy_no: {
      primary: true,
      type: 'int',
      generated: false,
    },
    abha_id: {
      type: 'varchar',
      nullable: true,
    },
    ins_type: {
      type: 'varchar',
      nullable: true,
    },
    ins_provider: {
      type: 'varchar',
      nullable: true,
    },
    amount: {
      type: 'varchar',
      nullable: true,
    },
    end_date: {
      type: 'date',
      nullable: true,
    },
    start_date: {
      type: 'date',
      nullable: true,
    }
  },
  relations: {
    student: {
      target: "student",
      type: "many-to-one",
      joinTable: true,
      cascade: false,
  },
  employee: {
    target: "employee",
    type: "many-to-one",
    joinTable: true,
    cascade: false,
},
  }
});
