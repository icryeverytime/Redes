const http= require('http')
const port=3000
const express=require('express')
const app=express()
const cors=require('cors')
var mysql=require('mysql')


app.use(cors())
app.options('*',cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    next();
});
app.post('/registro',(req,res)=>{
    let rand=Math.floor(Math.random()*100000000)
    let sql='INSERT INTO User SET ?'
    let post={
      fname: req.body.fname,
      lname: req.body.lname,
      user: req.body.user,
      email: req.body.email,
      password: req.body.password,
      activo: "no",
      hash: rand
    }
    var con=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123456789",
      database: "Redes"
    });
    con.connect(function(err){
      if(err){
        console.log(err)
      }
      con.query(sql,post,function(err,result,fields){
        if(err)
        {
          console.log(err.sqlMessage)
         if(err.sqlMessage.includes("User.PRIMARY"))
         {
             res.send("user")
         }
         else if(err.sqlMessage.includes("User.email"))
         {
             res.send("email")
         }
          res.end()
        }
        else{

          res.json({
          number: result
        })
        console.log(result)
        res.end()
        }
      })
    })
  });
app.listen(5000,(req,res)=>{
    console.log('Express API esta corriendo en el puerto 5000');
});
