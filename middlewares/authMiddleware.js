const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/customErrorClass')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Token invalid.')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { userId: decoded.userId, name: decoded.name }

    next()
  } catch (error) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      `Not authorized to access this route. ${error.message}`
    )
  }
}

module.exports = authMiddleware
