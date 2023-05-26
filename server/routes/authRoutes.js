const express = require('express')
const jwtDecode = require('jwt-decode')
const bcrypt = require('bcrypt')
const PostgresDataSource = require('../models/model')
const Student = require('../models/studentModel')
const Employee = require('../models/employeeModel')
const Admin = require('../models/adminModel')
const Doctor = require('../models/doctorModel')

const router = express.Router()

const {
    createToken
} = require('../util');

// router.get('/test', async (req, res) => {
//     const firstUser = PostgresDataSource
//     .createQueryBuilder()
//     .insert()
//     .into(Student)
//     .values({
//         prNo: "prno",
//         abha_Id: "abha_id",
//         abha_username: "abha_user",
//         fName: "fname",
//         mName: "req.body.mname ? mname : null",
//         lName: "lname",
//         gender: "gender",
//         year: "year",
//         program: "program",
//         imageType: "req.file.mimetype",
//         imageName: "req.file.originalname",
//         imageData: "req.file.buffer",
//     })
//             .getSql()

//     res.json(firstUser)
// })

router.post('/login', async (req, res) => {
    const { type, abha_Id, p_id } = req.body
    // console.log(req.body)
    if (type === 'student') {
        const firstUser = await PostgresDataSource.getRepository(Student)
            .createQueryBuilder("student")
            .where("student.abha_Id = :id", { id: abha_Id })
            .andWhere("student.prNo = :prno", { prno: p_id })
            .getOne()

        if (firstUser) {
            const { imageName, imageType, imageData, ...rest } = firstUser;
            const userInfo = Object.assign({}, { ...rest }, { role: 'student' });
            const token = createToken(userInfo);
            req.session.user = userInfo;
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            res.status(200).json({
                message: 'Authentication successful!',
                token,
                userInfo,
                expiresAt
            });
        }
        else {
            res.status(403).json({ message: 'wrong student id' })
        }
    }
    if (type === 'employee') {
        const firstUser = await PostgresDataSource
            .getRepository(Employee).createQueryBuilder("employee")
            .where("employee.abha_Id = :id", { id: abha_Id })
            .andWhere("employee.empNo = :empno", { empno: p_id })
            .getOne()

        if (firstUser) {
            const { imageName, imageType, imageData, ...rest } = firstUser;
            const userInfo = Object.assign({}, { ...rest }, { role: 'employee' });
            const token = createToken(userInfo);
            req.session.user = userInfo;
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            res.status(200).json({
                message: 'Authentication successful!',
                token,
                userInfo,
                expiresAt
            });
        }
        else {
            res.status(403).json({ message: 'wrong employee id' })
        }
    }

})


router.post('/doctor/login', async (req, res) => {
    const { doctor_id, contact_no } = req.body

    console.log(req.body)

    const firstUser = await PostgresDataSource.getRepository(Doctor)
        .createQueryBuilder("doctor")
        .where("doctor.doctor_id = :id", { id: doctor_id })
        .andWhere("doctor.contact_no = :number", { number: contact_no })
        .getOne()

        console.log(firstUser)
    if (firstUser) {
        
            const userInfo = Object.assign({}, { ...firstUser }, { role: 'doctor' });
            const token = createToken(userInfo);
            console.log(userInfo)
            req.session.user = userInfo;
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            res.status(200).json({
                message: 'Authentication successful!',
                token,
                userInfo,
                expiresAt
            });

    }
})

router.post('/doctor/register', async (req, res) => {
    const { id, pass } = req.body

    const firstUser = await PostgresDataSource.getRepository(Student)
        .createQueryBuilder("doctor")
        .where("doctor.doctor_id  = :id", { id: id })
        .getOne()

    if (!firstUser) {
        const password = bcrypt.hashSync(pass, 10)
        if (pass) {
            const user = await PostgresDataSource.getRepository(Medical).save({ id, emailid, password, designation, role })
            if (user) {
                res.status(200).json({ message: 'User registered successfully' })
            }
        }
    }
})


router.post('/admin/register', async (req, res) => {
    const { emailid, name, pass } = req.body

    const firstUser = await PostgresDataSource.getRepository(Admin)
        .createQueryBuilder("admin")
        .where("admin.emailid  = :id", { id: emailid })
        .getOne()

    if (!firstUser) {
        const password = bcrypt.hashSync(pass, 10)
        if (pass) {
            const user = await PostgresDataSource.getRepository(Admin).save({ emailid, name, password })
            if (user) {
                res.status(200).json({ message: 'User registered successfully' })
            }
        }
    }else{
        res.json({ message: 'User already exists' })
    }
})

router.post('/admin', async (req, res) => {
    const { emailid, pass } = req.body

    // console.log(req.body)

    const firstUser = await PostgresDataSource.getRepository(Admin)
        .createQueryBuilder("admin")
        .where("admin.emailid = :id", { id: emailid })
        .getOne()

        // console.log(firstUser)

    if (firstUser) {
        const test = bcrypt.compareSync(pass, firstUser.password)
        if (test) {
            const { password, ...rest } = firstUser;
            const userInfo = Object.assign({}, { ...rest }, { role: 'admin' });
            const token = createToken(userInfo);
            req.session.user = userInfo;
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            res.status(200).json({
                message: 'Authentication successful!',
                token,
                userInfo,
                expiresAt
            });
        }
    }else{
        res.status(403).json({ message: 'wrong email id or password' })
    }
    
})


module.exports = router