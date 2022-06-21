const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

const validatorRegisterUser = [
  check('name', 'Enter a name valid.')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage(`The name must be between 2 or 50 characters long.`)
    .escape(),
  check('email', 'Enter a email valid.')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage(`Email invalid.`)
    .escape(),
  check('password', 'Enter a password valid.')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The password must be between 8 or 16 characters long.`)
    .escape(),

  (req, res, next) => checkValidator(req, res, next)
]

module.exports = validatorRegisterUser
