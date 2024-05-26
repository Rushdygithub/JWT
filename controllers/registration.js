require('dotenv').config()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const {hashPassword,compareHashPassword} = require('../helper/helper')
const jwt = require('jsonwebtoken')

//database connection
con = mysql.createConnection({
    host: process.env.HOS,
    user: process.env.USER_NAME,
    database: process.env.DATABASE,
    password: ''
})
  
const dbConnect = () => {
      con.connect((error)=> {
          if (error) {
              console.log(error)
          } else 
          {
                  console.log('connection success')
          }
      })
}
dbConnect()

//user registration
const register = async (req,res) => {
    try 
    {
        let {name,email,password} = req.body
        let hash = await hashPassword(password)
        let MYSQL  = 'SELECT * FROM user WHERE email=?'
        let MYSQL1 = 'INSERT INTO user (name,email,password) VALUES (?,?,?)'

        con.query(MYSQL, [email], (error,result)=> {

            if (error) throw console.log('++++++++++++++MYSQL-QUERY-ERROR++++++++++++++++++++',error.message)
            if (result.length > 0)
            {
               return res.send('your email address is already in, try again')     
            }
               
               con.query(MYSQL1, [name,email,hash], async (error)=> {
                if (error) throw error.message
                    return res.send('registration success')
                })
            //Here you can not do two of return at once it will trow an error
            //Return res.send('success') - this will excute
        })
        
    } catch (error) 
    {
            console.log('++++++++++++++REGISTRATION-ERROR++++++++++++++++++++',error.message)
            return res.send(error.message)
    }
}

const login = async (req,res) => {
    try {
        let {email,password} = req.body

        let sql = 'SELECT * FROM  user  WHERE email=?'
        let sql1= 'SELECT password FROM user WHERE email = ?';

        con.query(sql,email, async (error,result)=> {
            if (error) throw console.log('++++++++++++++MYSQL-QUERY-ERROR++++++++++++++++++++',error.message)
            let userEmail = result[0].email
            let msg = ''
            if (result.length>0)
            {
            //console.log('-----------------------result-------------------------', result)
                con.query(sql1,email, async (error,result)=> {
                    let hashedPasswordFromDB = result[0].password;
                
                    
                    let compare = await compareHashPassword(password,hashedPasswordFromDB)
                    if(compare)
                    { 
                        const SECRETKEY = 'jwtsecjjcgsjjddmdkdxxxdjnffmfffl'
                    
                        const token = jwt.sign({ userId: userEmail}, SECRETKEY , {
                            expiresIn: '1h',
                        });
                        console.log(token)
                        return res.send({token:token})


                    } else {
                        msg = 'Password is dismatch, try again'

                    }
               
                })          
            } else {
                msg = 'Email is invalid'
            }
            console.log(msg)
            
        })

    } catch (error)
    {
        console.log('++++++++++++++LOGIN-ERROR++++++++++++++++++++',error.message)
        return res.send(error.message)
    }
}


module.exports = {
    register,
    login
} 

