class CustomError extends Error {
  /**
   *
   * @param {number} statusCode http status code.
   * @param {string} message error message.
   */
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

module.exports = CustomError
