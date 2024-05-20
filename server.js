const express = require('express')
const app = express()
// const router  = express.Router()
const router = require('./routes/registration')
require('dotenv').config()
const mysql = require('mysql')
const bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())
app.use('/api', router) 



//Up the server
app.listen(process.env.PORT, ()=> {
    console.log(`Server is runing on http://localhost:${process.env.PORT}`)
})

