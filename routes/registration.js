const express = require('express')
const router  = express.Router()
const register = require('../controllers/registration')


//test router
router.get('/test', (req,res) => {
    try{
        res.send("done")   
    } catch (error) {
        console.log(error)
    }
})

//registration route
router.post('/register', (req,res)=> {
    register(req,res)
})


module.exports = router