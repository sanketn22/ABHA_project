const routes = require('express').Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const PostgresDataSource = require('../models/model');
const Employee = require('../models/employeeModel')
const Student = require('../models/studentModel')
const Dependent = require('../models/dependentModel');

const requireEmployee = (req, res, next) => {
    const user = req.session.user;
    // console.log(user)
    try {
        if (user.role !== "employee") {
            return res.status(401).json({ message: "Insufficient role" });
        }
        next();
    } catch (err) {
        console.log(err)
    }
};

const requireStudent = (req, res, next) => {
    const user = req.session.user;
    // console.log(user)
    try {
        if (user.role !== "student") {
            return res.status(401).json({ message: "Insufficient role" });
        }
        next();
    } catch (err) {
        console.log(err)
    }
};

routes.post('/add-dependent', requireStudent, upload.single('image'), async (req, res) => {
    const { id, abha_id, abha_user, fname, mname, lname, gender, relation } = req.body
    const { file } = req

    const { user } = req.session

    console.log(user.prNo)

    try {
        await PostgresDataSource
            .createQueryBuilder()
            .insert()
            .into(Dependent)
            .values({
                ids: id,
                abha_Id: abha_id,
                abha_Username: abha_user,
                fName: fname,
                mName: mname,
                lName: lname,
                gender: gender,
                relation: relation,
                imageType: file.mimetype,
                imageName: file.originalname,
                imageData: file.buffer,
                studentPrNo: user.prNo
            })
            .execute()

            await PostgresDataSource.query(`UPDATE dependent SET "employeeEmpNo" = ${user.prNo} WHERE "ids" = ${id}`)

        res.redirect('/dashboard')

    } catch (err) {
        console.error(err)
        res.json({
            error: err
        })
    }
})

routes.post('/e/add-dependent', requireEmployee, upload.single('image'), async (req, res) => {
    const { id, abha_id, abha_user, fname, mname, lname, gender, relation } = req.body
    const { file } = req

    const user = req.session.user

    try {
        await PostgresDataSource
            .createQueryBuilder(Dependent)
            .insert()
            .into(Dependent)
            .values({
                ids: id,
                abha_Id: abha_id,
                abha_Username: abha_user,
                fName: fname,
                mName: mname,
                lName: lname,
                gender: gender,
                relation: relation,
                imageType: file.mimetype,
                imageName: file.originalname,
                imageData: file.buffer,
                employeeEmpNo: user.empNo
            })
            .execute()

            await PostgresDataSource.query(`UPDATE dependent SET "employeeEmpNo" = ${user.empNo} WHERE "ids" = ${id}`)

        res.redirect('/dashboard/e')

    } catch (err) {
        console.error(err)
        res.json({
            error: err
        })
    }
})

routes.get('/e/get-all', async (req, res) => {
    const user = req.session.user

    const dependents = await PostgresDataSource
        .createQueryBuilder()
        .select("dependent.*")
        .from(Dependent, "dependent")
        .innerJoin(Employee, "employee", "dependent.employeeEmpNo = employee.empNo")
        .andWhere("dependent.employeeEmpNo = :id",{ id: user.empNo})
        .getRawMany();

    res.json(dependents)
})

routes.get('/get-all', async (req, res) => {
    const dependents = await PostgresDataSource
        .createQueryBuilder()
        .select("dependent.*")
        .from(Dependent, "dependent")
        // .innerJoinAndSelect(Student, "student", "dependent.studentPrNo = student.prNo")
        .innerJoin(Student, "student", "dependent.studentPrNo = student.prNo")
        .andWhere("dependent.studentPrNo = :id",{ id: user.prNo})
        .getRawMany();

    res.json(dependents)
})


module.exports = routes