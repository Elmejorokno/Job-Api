const express = require('express')
const {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob
} = require('../controllers/jobsController')
const validatorCreateJob = require('../validators/createJobValidator')
const validatorUpdateJob = require('../validators/updateJobValidator')

const router = express.Router()

router.get('/', getAllJobs)
router.get('/:jobId', getSingleJob)
router.post('/', validatorCreateJob, createJob)
router.patch('/:jobId', validatorUpdateJob, updateJob)
router.delete('/:jobId', deleteJob)

module.exports = router
