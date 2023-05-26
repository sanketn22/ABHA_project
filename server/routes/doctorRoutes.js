const express = require('express')
const PostgresDataSource = require('../models/model')
const Medical = require('../models/medicalModel')
const Doctor = require('../models/doctorModel')

const router = express.Router()

const {
    requireAdmin
} = require('../util');

router.get('/all-data', async (req, res) => {
    const user = await PostgresDataSource.getRepository(Medical).find({})

    if (user) {
        res.status(200).json(user)
    }

    res.json({ message: 'no data' })
})

router.get('/individual', async (req, res) => {
    const { abha_id } = req.body
    const user = await PostgresDataSource.getRepository(Medical).find({ abha_id })

    if (user) {
        res.status(200).json(user)
    }

    res.json({ message: 'no data' })
})

router.post('/medical/add-data', async (req, res) => {
    const { reccord_id, abha_id, prescription, diagnosis, d_reports, date_of_visits, lab_reports } = req.body
    
    
    const user = await PostgresDataSource.getRepository(Medical).save(
        { reccord_id, abha_id, prescription, diagnosis, d_reports, date_of_visits, lab_reports }
    )

    if(user){
        res.status(201).json(user)
    }else{
        res.json({message: 'Something Went Wrong'})
    }
})
    


router.post('/add-data', async (req, res) => {
    const {doctor_id, doctor_name, specialization, contact_no, gender, address} = req.body

    console.log(req.body)
    try{
        const user = await PostgresDataSource
        .createQueryBuilder()
        .insert()
        .into(Doctor)
        .values({
            doctor_id, doctor_name, specialization, contact_no, gender, address
        })
        .execute()

        if(user){
            res.status(201).json(user)
        }
    }catch(err){
        res.json({message: 'Something Went Wrong'})
    }
        

    
    
})




module.exports = router