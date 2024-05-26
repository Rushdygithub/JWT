const express = require('express')
const router  = express.Router()
const {register,login} = require('../controllers/registration')
const {verifyToken} = require('../helper/helper')

//test router
router.get('/test', verifyToken, (req,res) => {
    try{
        res.send("done")   
    } catch (error) {
        console.log(error)
    }
})

//registration route
router.post('/register', async (req,res)=> {
    await register(req,res)
})

router.post('/login', async (req,res)=> {
    await login(req,res)
})


module.exports = router