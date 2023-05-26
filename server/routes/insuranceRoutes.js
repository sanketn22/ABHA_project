const router = require('express').Router()

const { PostgresDataSource } = require('../models/model');
const Insurance = require('../models/insuranceModel')

const {
    requireEmployee,
    requireStudent
  } = require('../util');

router.get('/dashboard/insurance', async (req, res) => {
    const user = req.session.user
    try {
        const insurance = await PostgresDataSource
            .createQueryBuilder()
            .select()
            .from(Insurance, 'insurance')
            .where('insurance.studentPrNo = :id', { id: user.prNo })
            .getMany()

        res.json(insurance)
    }catch(err) {
        console.log(err)
    }
})

router.post('/dashboard/add-insurance', async (req, res) => {
    const { policy_no, ins_type, ins_provider, start_date, abha_id, amount, end_date, studentPrNo } = req.body

    try {
        await PostgresDataSource
            .createQueryBuilder()
            .insert()
            .into(Insurance)
            .values({
                policy_no: policy_no,
                ins_type: ins_type,
                ins_provider: ins_provider,
                start_date: start_date,
                abha_id: abha_id,
                amount: amount,
                end_date: end_date,
                studentPrNo: studentPrNo
            })
            .execute()


        // await PostgresDataSource
        //     .createQueryBuilder()
        //     .update(Student)
        //     .set({ insurance_Policy: true })
        //     .where('prNo = :id', { id: studentPrNo })
        //     .execute()
        }catch(err) {
            console.log(err)
        }
})

router.post('dashboard/e/add-insurance', async (req, res) => {
    const { policy_no, ins_type, ins_provider, start_date, abha_id, amount, end_date , employeeEmpNo} = req.body

    try {
        await PostgresDataSource
            .createQueryBuilder()
            .insert()
            .into(Insurance)
            .values({
                policy_no: policy_no,
                ins_type: ins_type,
                ins_provider: ins_provider,
                start_date: start_date,
                abha_id: abha_id,
                amount: amount,
                end_date: end_date,
                employeeEmpNo: employeeEmpNo
            })
            .execute()
        }catch(err) {
            console.log(err)
        }
})

module.exports = router