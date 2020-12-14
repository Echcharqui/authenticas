const logSymbols = require('log-symbols')
const mongoose = require('mongoose')

/// /////////  database connection ////////////
const InitiateMongoServer = (dbUser, dbPassword, dbName) => {
  mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@authservice.ooho7.mongodb.net/${dbName}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
  )
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log(logSymbols.success, '\x1b[32m', `Connection to the database [${dbName}] has been established successfully.`)
  })
}
/// //////////////////////////////////////////

module.exports = { InitiateMongoServer }
