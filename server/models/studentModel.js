const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Student',
    tableName: 'student',
    columns: {
        prNo: {
            primary: true,
            type: 'int',
            generated: false,
        },
        abha_Id: {
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
        program: {
            type: 'varchar',
            nullable: true,
        },
        year: {
            type: 'date',
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
        }
    },
    relations: {
        insurance_policy: {
            target: 'insurance',
            type: 'one-to-many',
            joinColumn: true,
            cascade: true,
          }
    },
});
