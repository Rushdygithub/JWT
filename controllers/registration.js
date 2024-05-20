require('dotenv').config()
const mysql = require('mysql')

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
const register =  (req,res) => {
    try 
    {
        let {name,email,password} = req.body

        let MYSQL  = 'SELECT * FROM user WHERE email=?'
        let MYSQL1 = 'INSERT INTO user (name,email,password) VALUES (?,?,?)'

        con.query(MYSQL, [email], (error,result)=> {

            if (error) throw error.message
            if (result.length > 0)
            {
               return res.send('your email address is already in, try again')     
            }
               con.query(MYSQL1, [name,email,password], (error)=> {
                if (error) throw error.message
                    return res.send('registration success')
                })
            //Here you can not do two of return at once it will trow an error
            // return res.send('success') - this will excute
        })
        
    } catch (error) 
    {
            console.log(error.message)
            return res.send(error)
    }
   
}

module.exports = register

