const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

const statusValid = ['interview', 'declined', 'pending']

const validatorUpdateJob = [
  check('company', 'Enter a company name valid.')
    .trim()
    .custom((value) => {
      if (!value || (value.length >= 2 && value.length <= 60)) {
        return true
      }

      return false
    })
    .withMessage(`The company name must be between 2 or 60 characters long.`)
    .escape(),
  check('position', 'Enter a position job valid.')
    .trim()
    .custom((value) => {
      if (!value || (value.length >= 2 && value.length <= 60)) {
        return true
      }

      return false
    })
    .withMessage(`The job position must be between 2 or 60 characters long.`)
    .escape(),
  check('status', 'Enter a job status valid.')
    .trim()
    .custom((value) => {
      if (!value || statusValid.includes(value)) {
        return true
      }

      return false
    })
    .withMessage(
      `The job status only has to be one of the following options: ${statusValid}`
    ),

  (req, res, next) => checkValidator(req, res, next)
]

module.exports = validatorUpdateJob
