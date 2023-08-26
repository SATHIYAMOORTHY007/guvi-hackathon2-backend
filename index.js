const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./db/mongoose')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4001
const movie = require('./routers/movie')
const theater = require('./routers/theater')
const reservation = require('./routers/reservation')
const showtime = require('./routers/showtime')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/auth')
const payment = require('./routers/pay')
var nodemailer = require('nodemailer')

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://dapper-cucurucho-7b2a5e.netlify.app',
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1', movie)
app.use('/api/v1', reservation)
app.use('/api/v1', theater)
app.use('/api/v1', showtime)
app.use('/api/v1', payment)
app.listen(process.env.port, () => {
  console.log(`port number ${port}`)
  connectDB()
})
