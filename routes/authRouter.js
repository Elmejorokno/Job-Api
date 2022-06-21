const express = require('express')
const { login, register } = require('../controllers/authController')
const validatorLoginUser = require('../validators/loginUserValidator')
const validatorRegisterUser = require('../validators/registerUserValidator')

const router = express.Router()

router.post('/login', validatorLoginUser, login)
router.post('/register', validatorRegisterUser, register)

module.exports = router
