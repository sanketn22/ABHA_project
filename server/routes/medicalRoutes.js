const express = require('express')
const PostgresDataSource = require('../models/model')
const Student = require('../models/studentModel')
const Employee = require('../models/employeeModel')
const Medical = require('../models/medicalModel')

const router = express.Router()

const {
    createToken,
    requireEmployee,
    requireStudent
} = require('../util');


router.get('/test', async (req, res) => {
    // const firstUser = await PostgresDataSource
    // .createQueryBuilder('Medical')
    // .innerJoin('medical.student', 'student')
    // .where('student.abha_Username = :username', { username: 'abha_user' })
    // .select([
    //   'medical.prescription',
    //   'medical.diagnosis',
    //   'medical.doctor_isd',
    //   'medical.lab_reports',
    //   'medical.date_of_visits'
    // ]).getSql();
})


module.exports = router