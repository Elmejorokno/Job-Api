const { check } = require('express-validator')
const checkValidator = require('../middlewares/checkValidator')

const validatorLoginUser = [
  check('email', 'Enter a email valid.')
    .trim()
    .isEmail()
    .withMessage(`Email invalid.`)
    .normalizeEmail()
    .escape(),
  check('password', 'Enter a password valid.')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The password must be between 8 or 16 characters long.`)
    .escape(),

  (req, res, next) => checkValidator(req, res, next)
]

module.exports = validatorLoginUser
