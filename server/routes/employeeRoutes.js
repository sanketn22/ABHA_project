const routes = require('express').Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const PostgresDataSource = require('../models/model');
const Employee = require('../models/employeeModel')


routes.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const firstUser = await PostgresDataSource
            .getRepository(Employee)
            .createQueryBuilder("employee")
            .where('employee."empNo" = :empNo', { empNo: id })
            .getOne()


        if (firstUser) {
            // console.log(firstUser)
            res.status(200).json(firstUser)
        }
    } catch (err) {
        res.json({
            error: err
        })
    }

})

routes.post('/register', upload.single('image'), async (req, res) => {
    const { empno, abha_id, abha_user, fname, mname, lname, gender } = req.body
    const { file } = req

    try {
        await PostgresDataSource
            .createQueryBuilder()
            .insert()
            .into(Employee)
            .values({
                empNo: empno,
                abha_Id: abha_id,
                abha_username: abha_user,
                fName: fname,
                mName: mname,
                lName: lname,
                gender: gender,
                imageType: file.mimetype,
                imageName: file.originalname,
                imageData: file.buffer,
            })
            .execute()
        res.json(
            { message: 'created' }
        )
    } catch (err) {
        console.error(err)
        res.json(
            { error: err }
        )
    }
})


module.exports = routes