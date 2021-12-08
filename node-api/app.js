const http= require('http')
const port=3000
const express=require('express')
const app=express()
const cors=require('cors')
var mysql=require('mysql')
var nodemailer=require('nodemailer');
const clientId='965546171874-7e227ia6k5begapiu3mhe6bnu57eu7cq.apps.googleusercontent.com';
const clientsecret='ApCBEdpK8Wp8Uh0am4biRWqS';
const redirecturl='https://developers.google.com/oauthplayground';
const refreshToken='1//04mDIVjFNGsChCgYIARAAGAQSNwF-L9IraXWWN3E-EAtadj2zog8TQIq8mvncyVUBFhtiJgDVuNmKwGX1dbtXW-proPavBC3u0jk';
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      user: 'internetcompany68@gmail.com',
      clientId: '965546171874-7e227ia6k5begapiu3mhe6bnu57eu7cq.apps.googleusercontent.com',
      clientSecret: 'ApCBEdpK8Wp8Uh0am4biRWqS',
      refreshToken: '1//04mDIVjFNGsChCgYIARAAGAQSNwF-L9IraXWWN3E-EAtadj2zog8TQIq8mvncyVUBFhtiJgDVuNmKwGX1dbtXW-proPavBC3u0jk',
      accessToken: 'ya29.a0ARrdaM8N6y0Ch4YYz4kosEeWpcfECFivxKsGqOPWtleSYq4wMYo3ZEDGbUZ4n-WcU3UN-TSqmSxxBJPK2neRfA41q15e0-PuwnjZXN5CadOJjMGZgZD8c-g36c3QQtEVchrPc8n5qkE1a3mpAugxLcx_oudO',
      expires: 1484314697598
  }
});

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
app.get('/verify/:email/:hash',function(req,res){
    var data={
        "email":{
            "email":req.params.email,
            "hash":req.params.hash
        }
    }
    let sql=`UPDATE User SET ? WHERE email = ? and hash =?`
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
          con.query(sql,[{activo: "yes"},req.params.email,req.params.hash],function(err,result,fields){
              if(err)
              {
                  console.log(err)
              }
              res.redirect('http://localhost:4200/login')
              res.end
          })
      })
    console.log(data)
})
app.post('/login',(req,res)=>{
    let sql='SELECT * FROM User WHERE (user =? OR email=?) AND password=? AND activo=?'
    let sql2='SELECT * FROM User WHERE user=? or email=?'
    let sql3='SELECT * FROM User WHERE (user=? or email=?) and activo=?'
    var a=0
    var con=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123456789",
        database: "Redes"
    });
      con.connect(function(err){
        if(err)
        {
            console.log(err)
        }
        con.query(sql3,[req.body.usuario,req.body.usuario,"no"],function(err,result,fields){
            if(err)
            {
                console.log(err)
            }
            if(result.length>0)
            {
                a=1
                res.send("No esta verificado el correo")
                res.end
                return
            }
            else{
                con.query(sql,[req.body.usuario,req.body.usuario,req.body.password,"yes"],function(err,result,fields){
                    if(err){
                        console.log(err)
                    }
                    if(result.length>0)
                    {
                        res.send(req.body.usuario)
                        res.end
                    }
                    else{
                        res.send("No existe una cuenta con estas credenciales")
                        res.end
                    }
                }) 
            }
        })
    })
})
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
        transporter.sendMail({
            from: 'internetcompany68@gmail.com',
            to: req.body.email,
            subject: 'Verify your email',
            text: 'I hope this message gets through!',
            html: '<div style="text-align:center; width: 700px;margin-left: auto; margin-right: auto; border: 1px solid black;"><h2 style="background-color: #0096c7; color: white;">Music Site</h2><p>Hi '+req.body.fname+' '+req.body.lname+'! The last step to your registration <br>is activating your account by clicking the button below.</p><a href="http://25.83.103.75:5000/verify/'+req.body.email+'/'+rand+'"><button style="width: 200px; height: 40px; font-size: 20px; background-color: #0096c7; color: white; transition: 0.5s; margin-top: 10px;">Verify Email</button></a><br><p>If you did not request an email verification you can safely ignore this email.</p></div>', 
            auth: {
              type: 'OAuth2',
              user: 'internetcompany68@gmail.com',
              clientId: '965546171874-7e227ia6k5begapiu3mhe6bnu57eu7cq.apps.googleusercontent.com',
              clientSecret: 'ApCBEdpK8Wp8Uh0am4biRWqS',
              refreshToken: '1//04mDIVjFNGsChCgYIARAAGAQSNwF-L9IraXWWN3E-EAtadj2zog8TQIq8mvncyVUBFhtiJgDVuNmKwGX1dbtXW-proPavBC3u0jk',
              accessToken: 'ya29.a0ARrdaM8N6y0Ch4YYz4kosEeWpcfECFivxKsGqOPWtleSYq4wMYo3ZEDGbUZ4n-WcU3UN-TSqmSxxBJPK2neRfA41q15e0-PuwnjZXN5CadOJjMGZgZD8c-g36c3QQtEVchrPc8n5qkE1a3mpAugxLcx_oudO',
              expires: 1484314697598
            }
            });
        console.log(result)
        res.end()
        }
      })
    })
  });
app.listen(5000,(req,res)=>{
    console.log('Express API esta corriendo en el puerto 5000');
});
