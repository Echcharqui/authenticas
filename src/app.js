require('dotenv').config()
const express = require('express')

const app = express()

const port = process.env.PORT
const host = process.env.HOST

app.get('/', (req, res) => {
  res.json('everything is cool!')
})

app.listen(port, `${host}`, () => {
  console.log(
    `The Auth Service is runing on port ${port}
      visit: [http://127.0.0.1:${port}]`
  )
})
