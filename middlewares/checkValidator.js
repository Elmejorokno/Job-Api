const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customErrorClass')

/**
 * Middleware that check if the validator from express-validator don't have any error.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If there is no one error will return the next() function,
 * another case will throw a error.
 */
const checkValidator = (req, res, next) => {
  try {
    validationResult(req).throw()

    return next()
  } catch (error) {
    let errorMessage = ''
    error.array().map((err) => (errorMessage += err.msg + ' '))

    throw new CustomError(StatusCodes.FORBIDDEN, errorMessage.trim())
  }
}

module.exports = checkValidator
