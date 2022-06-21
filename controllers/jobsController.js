const { matchedData } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customErrorClass')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')

  return res.status(StatusCodes.OK).json({ jobs })
}

const getSingleJob = async (req, res) => {
  const { jobId } = req.params
  const { user } = req

  const job = await Job.findOne({ _id: jobId, createdBy: user.userId })

  if (!job) {
    throw new CustomError(StatusCodes.NOT_FOUND, `The job isn't exists.`)
  }

  return res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  const { company, position, status } = matchedData(req)

  const { userId } = req.user

  const job = await Job.create({ company, position, status, createdBy: userId })

  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const { jobId } = req.params
  const { user } = req
  const { company, position, status } = matchedData(req)

  let objUpdate = {}

  if (company) objUpdate.company = company
  if (position) objUpdate.position = position
  if (status) objUpdate.status = status

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: user.userId },
    objUpdate,
    {
      new: true,
      runValidators: true
    }
  )

  if (!job) {
    throw new CustomError(StatusCodes.NOT_FOUND, `The job isn't exists.`)
  }

  return res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const { jobId } = req.params
  const { user } = req

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: user.userId })

  if (!job) {
    throw new CustomError(StatusCodes.NOT_FOUND, `The job isn't exists.`)
  }

  return res.status(StatusCodes.OK).json({ job })
}

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob
}
