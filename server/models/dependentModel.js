const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Dependent',
  tableName: 'dependent',
  columns: {
    ids: {
      primary: true,
      type: 'int',
      generated: false,
    },
    abha_Id: {
      unique: true,
      type: 'int',
      nullable: true,
    },
    abha_Username: {
      type: 'varchar',
      nullable: true,
    },
    fName: {
      type: 'varchar',
      nullable: true,
    },
    mName: {
      type: 'varchar',
      nullable: true,
    },
    lName: {
      type: 'varchar',
      nullable: true,
    },
    gender: {
      type: 'varchar',
      nullable: true,
    },
    relation: {
      type: 'varchar',
      nullable: true,
    },
    imageType: {
      type: 'varchar',
      nullable: true
    },
    imageName: {
      type: 'varchar',
      nullable: true
    },
    imageData: {
      type: 'bytea',
      nullable: true,
    },

  },
  relations: {
    student: {
        target: "Student",
        type: "many-to-one",
        joinTable: true,
        cascade: false,
    },
    employee: {
      target: "Employee",
        type: "many-to-one",
        joinTable: true,
        cascade: false,
    }
}
});

