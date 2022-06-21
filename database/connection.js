const mongoose = require('mongoose')

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to the db ✨'))
    .catch((err) => console.log(`Error connecting to the db. ${err}`))
}

module.exports = connectDb
