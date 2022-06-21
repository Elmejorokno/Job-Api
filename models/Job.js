const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, 'Must provide a company.'],
      minlength: 2,
      maxlength: 60
    },
    position: {
      type: String,
      trim: true,
      required: [true, 'Must provide a position.'],
      minlength: 2,
      maxlength: 60
    },
    status: {
      type: String,
      trim: true,
      enum: {
        values: ['interview', 'declined', 'pending'],
        message: 'The status {VALUE} is not supported.'
      },
      default: 'pending'
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Must provide an user id.']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('jobs', JobSchema)
