const { DataSource } = require('typeorm')
const Student = require('./studentModel')
const Employee = require('./employeeModel')
const Dependent = require('./dependentModel')
const Doctor = require('./doctorModel')
const Insurance = require('./insuranceModel')
const Medical = require('./medicalModel')
const Admin = require('./adminModel')

require('dotenv').config(
    {
        path: './.env'
    }
)


const PostgresDataSource = new DataSource({
    type: process.env.DB_TYPE,
    url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        Student,
        Employee,
        Dependent,
        Doctor,
        Insurance,
        Medical,
        Admin
    ]
})

PostgresDataSource.initialize()

module.exports = PostgresDataSource