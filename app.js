const express = require('express')
require('dotenv').config()
require('express-async-errors')

const connectDb = require('./database/connection')
const authMiddleware = require('./middlewares/authMiddleware')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const app = express()

app.set('trust proxy', 1)

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true // Return rate limit info in the `RateLimit-*` headers
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', require('./routes/authRouter'))
app.use('/api/v1/jobs', authMiddleware, require('./routes/jobsRouter'))

app.use('*', require('./middlewares/notFound'))
app.use(require('./middlewares/errorHandler'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)

  connectDb()
})
