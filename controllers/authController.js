const { StatusCodes } = require('http-status-codes')
const { matchedData } = require('express-validator')
const User = require('../models/User')
const CustomError = require('../errors/customErrorClass')

const register = async (req, res) => {
  const { name, email, password } = matchedData(req)

  const user = await User.create({ name, email, password })

  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ token })
}

const login = async (req, res) => {
  const { email, password } = matchedData(req)

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, `User isn't exists.`)
  }

  if (!(await user.comparePassword(password))) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, `Incorrect password.`)
  }

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ token })
}

module.exports = {
  login,
  register
}
