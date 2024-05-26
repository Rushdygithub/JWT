const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const hashPassword = async (password) => {
    let salt_round = 10 
    let hash = await bcrypt.hash(password,salt_round)
    return hash
}

const compareHashPassword = async (pass,hashed) => {
    let compare = await bcrypt.compare(pass,hashed)
    return compare
}

const verifyToken = (req,res,next) => {

    const SECRETKEY = 'jwtsecjjcgsjjddmdkdxxxdjnffmfffl'
    
    const tokenHeader = req.header('token')

    try {
        const verified = jwt.verify(tokenHeader,SECRETKEY)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).send('Invalid token.')
    } 
}

module.exports = {
    hashPassword,
    compareHashPassword,
    verifyToken
}