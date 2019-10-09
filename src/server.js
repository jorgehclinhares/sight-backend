const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const dotenv = require('dotenv')


dotenv.config()

app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(cors())

app.use(routes)

app.listen(process.env.SERVER_PORT)
