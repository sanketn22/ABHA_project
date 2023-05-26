const routes = require('express').Router()
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const PostgresDataSource = require('../models/model');
const Student = require('../models/studentModel')

routes.get('/:id', async (req, res) => {
    const {id} = req.params
    const firstUser = await PostgresDataSource
        .getRepository(Student)
        .createQueryBuilder("student")
        .where("student.prNo = :id", { id: id })
        .getOne()

    if (firstUser) {
        res.json(firstUser)
    }
})

routes.post('/register', upload.single('image'), async (req, res) => {
    const { prno, abha_id, abha_user, fname, mname, lname, gender, year, program } = req.body

    try {
        const data = await PostgresDataSource
            .createQueryBuilder()
            .insert()
            .into(Student)
            .values({
                prNo: prno,
                abha_Id: abha_id,
                abha_Username: abha_user,
                fName: fname,
                mName: req.body.mname ? mname : null,
                lName: lname,
                gender: gender,
                year: year,
                program: program,
                imageType: req.file.mimetype,
                imageName: req.file.originalname,
                imageData: req.file.buffer,
            })
            .execute()
        console.log(data)
        res.json({ message: 'created' })
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: 'Check your PrNo' })
    }
})


module.exports = routes