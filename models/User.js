const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/customErrorClass')
const { StatusCodes } = require('http-status-codes')

const regExpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return regExpEmail.test(v)
      },
      message: (props) => `${props.value} is not a valid email.`
    },
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, 'Must provide a password.'],
    trim: true
  }
})

UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    user.password = hashPassword

    next()
  } catch (error) {
    throw new CustomError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Error hashing the password. ' + error.message
    )
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )
}

module.exports = mongoose.model('users', UserSchema)
