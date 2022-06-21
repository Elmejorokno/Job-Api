const { StatusCodes } = require('http-status-codes')

const notFound = (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send(`Route ${req.originalUrl} doesn't exists.`)
}

module.exports = notFound
