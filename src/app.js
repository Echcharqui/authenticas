const logSymbols = require('log-symbols')
require('dotenv').config()
const express = require('express')

const user = require('./routes/user')
const { InitiateMongoServer } = require('./database/database')

/// ///////// envirement variables ////////////
const port = process.env.PORT
const host = process.env.HOST
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
/// //////////////////////////////////////////

const app = express()
app.use(express.json())

/// ////// connecting the database /////////////
InitiateMongoServer(dbUser, dbPassword, dbName)
/// ///////////////////////////////////////////

app.get('/', (req, res) => {
  res.json('everything is cool !!')
})

app.use('/auth_service/', user)

app.listen(port, `${host}`, () => {
  console.log(logSymbols.info, '\x1b[36m',
    `The Auth Service is runing on port ${port}
      visit: [http://127.0.0.1:${port}]`
  )
})
