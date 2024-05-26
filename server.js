const express = require('express')
const app = express()
const router = require('./routes/registration')
require('dotenv').config()
const bodyParser = require('body-parser')
const {verifyToken} = require('./helper/helper')

// parse application/json
app.use(bodyParser.json())
app.use('/api', router) 
app.use(verifyToken)


//Up the server
app.listen(process.env.PORT, ()=> {
    console.log(`Server is runing on http://localhost:${process.env.PORT}`)
})

