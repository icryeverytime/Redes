const http= require('http')
const port=3000
const express=require('express')
const app=express()
const fs=require('fs')
const cloudinary=require('cloudinary').v2;
const cors=require('cors')
const multer=require('multer')
const https=require('https')
const axios=require('axios')
const {google}=require('googleapis');
const KEYFILEPATH='/home/icryeverytime/Downloads/warm-particle-352023-cc88570c7c29.json'
const SCOPES=['https://www.googleapis.com/auth/drive'];
const auth=new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
})
cloudinary.config({ 
  cloud_name: 'dncxshlgc', 
  api_key: '912564522554539', 
  api_secret: 'rdseSEGCk72YE1jLlkrcIdU3XRg' 
});
app.use(express.static('public'))
app.use('/images',express.static('images'))
const storage=multer.diskStorage({
  destination: (req,file,callBack)=>{
    callBack(null,'images')
  },
  filename: (req,file,callBack)=>{
    var string=require("crypto").randomBytes(10).toString('hex')
    callBack(null,`backend_${string}_${file.originalname}`)
  }
})
var upload=multer({storage: storage})
var mysql=require('mysql')
var url=require('url')
var request = require('request'); // "Request" library
var nodemailer=require('nodemailer');
var LastfmAPI = require('lastfmapi');

var client_id='ad9782deb2b24f2892eb347a05140d01'
var client_secret='42579b48778c4a80b71b66332960e2e0'
var redirect_uri='http://25.83.103.75:5000/callback'
var querystring = require('querystring');
const e = require('express')
const { fstat } = require('fs')
var redirect_uri2='http://localhost/4200/user'

var lfm = new LastfmAPI({
	'api_key' : '604024e30367d14d43eda34672a72cf2',
	'secret' : '3cb61d7d9b472fa5b4213ba76a11c338'
});

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
app.post('/getartist',function(req,res){
  console.log("getartist")
  let sql='SELECT email FROM user WHERE user=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.search,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result[0].email)
          let sql2='SELECT artist1,artist2,artist3,artist4,artist5 FROM artists WHERE correo=?'
          con.query(sql2,result[0].email,function(err,resultados){
            if(err)
            {
              console.log(err);
            }
            else{
              console.log(resultados)
              res.send(resultados)
            }
          })
        }
      })
    }
  })
})
app.post('/getalbum',function(req,res){
  let sql='SELECT email FROM user WHERE user=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.search,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result[0].email)
          let sql2='SELECT album1,album2,album3,album4,album5 FROM albums WHERE correo=?'
          con.query(sql2,result[0].email,function(err,resultados){
            if(err)
            {
              console.log(err);
            }
            else{
              console.log(resultados)
              res.send(resultados)
            }
          })
        }
      })
    }
  })
})
app.get('/:email/callback',function(req,res){
  var email=req.params.email
  console.log(email)
  var token=url.parse(req.url,true).query.token
  console.log(token)
  lfm.authenticate(token,function(err,session){
    console.log(session.username)
    console.log(session.key)
    let sql='UPDATE user SET ? WHERE user = ?'
    var con=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "@Password123",
      database: "redes"
    });
    con.connect(function(err){
      if(err)
      {
        console.log(err)
      }
      else{
        con.query(sql,[{usuariofm:session.username,secret:session.key},email],async function(err,result,fields){
          
          if(err)
          {
            console.log(err)
          }
          else{
            const url1='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user='+session.username+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
            const url2='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user='+session.username+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
            await axios.get(url1).then(res => {
                let sql2='INSERT INTO albums SET ?'
                let post1=({
                    correo: email,
                    album1: res.data.weeklyalbumchart.album[0].name,
                    album2: res.data.weeklyalbumchart.album[1].name,
                    album3: res.data.weeklyalbumchart.album[2].name,
                    album4: res.data.weeklyalbumchart.album[3].name,
                    album5: res.data.weeklyalbumchart.album[4].name
                })
                con.query(sql2,post1,function(err,result,fields){
                    if(err)
                    {
                      console.log(err)
                    }
                    else{
                      console.log(result)
                    }
                  })
                console.log(res.data.weeklyalbumchart.album[0].name);
                console.log(res.data.weeklyalbumchart.album[1].name);
                console.log(res.data.weeklyalbumchart.album[2].name);
                console.log(res.data.weeklyalbumchart.album[3].name);
                console.log(res.data.weeklyalbumchart.album[4].name);
                })
                .catch(error => {
                    console.error(error);
                });
                await axios.get(url2).then(res => {
                    let sql2='INSERT INTO artists SET ?'
                    let post1=({
                        correo: email,
                        artist1: res.data.weeklyartistchart.artist[0].name,
                        artist2: res.data.weeklyartistchart.artist[1].name,
                        artist3: res.data.weeklyartistchart.artist[2].name,
                        artist4: res.data.weeklyartistchart.artist[3].name,
                        artist5: res.data.weeklyartistchart.artist[4].name
                    })
                    con.query(sql2,post1,function(err,result,fields){
                        if(err)
                        {
                        console.log(err)
                        }
                        else{
                        console.log(result)
                        }
                    })
                    console.log(res.data.weeklyartistchart.artist[0].name);
                    console.log(res.data.weeklyartistchart.artist[1].name);
                    console.log(res.data.weeklyartistchart.artist[2].name);
                    console.log(res.data.weeklyartistchart.artist[3].name);
                    console.log(res.data.weeklyartistchart.artist[4].name);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            console.log(result)
            res.redirect('http://localhost:4200/user/'+email)
            res.end
          }
        })
      }
    })
  })  
})
app.post('/getarticletags',(req,res)=>{
  console.log(req.body.data.articleid)
  let sql='SELECT tags_post.id_articulo,tags_post.id_tags,tags.nombre FROM tags_post INNER JOIN tags ON tags.id_tags=tags_post.id_tags WHERE tags_post.id_articulo=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.articleid,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
        }
      })
    }
  })
})
app.post('/articlepost',(req,res)=>{
  console.log(req.body)
  console.log(req.body["0"])
  console.log(req.body["1"].data.insertId)
  console.log(req.body["1"].data.email)
  let sql=`UPDATE articles SET ? WHERE id_articles = ?`
  let post=({
    title: req.body["0"].titulo,
    content: req.body["0"].texto,
    email: req.body["1"].data.email
  })
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  });
  con.connect(function(err){
    if(err)
    {
      console.log(err)
      res.send(err)
      res.end
    }
    else{
      con.query(sql,[post,req.body["1"].data.insertId],function(err,result,fields){
        if(err)
        {
          console.log(err)
          res.send(err)
          res.end
        }
        else{
          console.log(result)
          if(req.body["0"].pop==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 1,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].hiphop==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 4,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].rock==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 2,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].country==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 5,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].rb==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 3,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].classical==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 7,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].regional==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 8,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].jazz==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 9,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].edm==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 10,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          if(req.body["0"].soul==true)
          {
            let sql3='INSERT INTO tags_post SET ?'
            let post2=({
              id_tags: 6,
              id_articulo: req.body["1"].data.insertId
            })
            con.query(sql3,post2,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
              }
            })
          }
          res.send("ingresado")
          res.end
        }
      })
    }
  })
  console.log(post)
})
app.post('/article',upload.any(),async(req,res)=>{
  console.log(req.files[0])
  let sql='INSERT INTO articles SET ?'
  var fecha
  cloudinary.uploader.upload(req.files[0].path,function(error,result){
    console.log("Cloudinary:")
    if(error)
    {
      console.log(error)
    }
    else{
      console.log("Resultado: "+result.secure_url)
      fecha=result[0];
      let post=({
        imagepath: result.secure_url
      })
    
        var con=mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "@Password123",
          database: "redes"
        });
        con.connect(function(err){
          if(err)
          {
            console.log(err)
          }
          else{
            con.query(sql,post,function(err,result,fields){
              if(err)
              {
                console.log(err)
              }
              else{
                console.log(result)
                res.send(result)
                res.end
              }
            })
          }
        })
    }
  })
  /*const driveService=google.drive({version: 'v3',auth:auth});
  
  let fileMetaData={
    'name':req.files[0].filename,
    parents: '1CVc9cd8CB2Wa-1DNLWO27Fl9v7RDE24V'

  }
  let media={
    mimeType: 'image/jpeg',
    body: fs.createReadStream(req.files[0].path)
  }
  let response=await driveService.files.create({
    resource: fileMetaData,
    media: media
  })*/
  
})
app.get('/fm/:user',function(req,res){
  var data=req.params.user
  let sql='SELECT usuariofm FROM user WHERE user=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  });
  con.connect(function(err){
    if(err){
        console.log(err)
  }
    con.query(sql,req.params.user,function(err,result,fields){
      if(err)
      {
        console.log(err)
      }
      res.send(result)
      res.end
    })
  })
})
app.get('/verify/:email/:hash',function(req,res){
    var data={
        "email":{
            "email":req.params.email,
            "hash":req.params.hash
        }
    }
    let sql=`UPDATE user SET ? WHERE email = ? and hash =?`
    var con=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "@Password123",
      database: "redes"
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
app.post('/getspecific',(req,res)=>{
  let sql='SELECT * FROM articles WHERE id_articles=?'
  console.log(req.body.data.articleid)
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.articleid,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/getarticles',(req,res)=>{
  let sql='SELECT id_articles,title,imagepath,email FROM articles'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
      res.send(err)
      res.end
    }
    con.query(sql,function(err,result,fields){
      if(err)
      {
        console.log(err)
        res.send(err)
        res.end
      }
      else{
        console.log("REsultado despues de getarticles")
        console.log(result)
        res.send(result)
        res.end
      }
    })
  })
})
app.get('/highlyrated',(req,res)=>{
  let sql='SELECT * FROM articles INNER JOIN article_rating ON articles.id_articles=article_rating.id_articles WHERE article_rating.calificacion=5;'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          res.send(result)
          let resultado=result
          console.log(resultado)
        }
      })
    }
  })
})
app.post('/searchuser',(req,res)=>{
  console.log(req.body) 
  console.log(req.body.data.search)
  let sql="SELECT user FROM user WHERE user like '%"+req.body.data.search+"%'"
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/searcharticle',(req,res)=>{
  console.log(req.body) 
  console.log(req.body.data.search)
  let sql="SELECT * FROM articles WHERE title like '%"+req.body.data.search+"%'"
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/gettaginfo',(req,res)=>{
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  let sql='SELECT * FROM tags WHERE id_tags=?'
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.search,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
        }
      })
    }
  })
})
app.post('/gettags',(req,res)=>{
  console.log(req.body.data.search)
  let sql="SELECT DISTINCT articles.title, articles.imagepath,articles.email,articles.id_articles FROM articles INNER JOIN tags_post ON tags_post.id_articulo=articles.id_articles INNER JOIN tags ON tags_post.id_tags=?"
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.search,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
        }
      })
    }
  })
})
app.post('/searchcontent',(req,res)=>{
  console.log(req.body) 
  console.log(req.body.data.search)
  let sql="SELECT * FROM articles WHERE content like '%"+req.body.data.search+"%'"
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/getuserrating',(req,res)=>{
  console.log(req.body.data.articleid)
  console.log(req.body.data.user)
  let sql='SELECT calificacion,comentario FROM article_rating WHERE id_articles=? and user=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err){
      console.log(err)
    }
    else{
      con.query(sql,[req.body.data.articleid,req.body.data.user],function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/rating',(req,res)=>{
  console.log(req.body)
  console.log(req.body[0].data.articleid)
  console.log(req.body[0].data.user)
  console.log(req.body[1].calificacion)
  let rate
  if(req.body[1].calificacion=="uno")
  {
    rate=1
  }
  if(req.body[1].calificacion=="dos")
  {
    rate=2
  }
  if(req.body[1].calificacion=="tres")
  {
    rate=3
  }
  if(req.body[1].calificacion=="cuatro")
  {
    rate=4
  }
  if(req.body[1].calificacion=="cinco")
  {
    rate=5
  }
  let sql='INSERT INTO article_rating SET ?'
  let post={
    "id_articles": req.body[0].data.articleid,
    "user": req.body[0].data.user,
    "calificacion": rate,
    "comentario" : req.body[1].mensaje
  }
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,post,function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send("ingresado")
          res.end
        }
      })
    }
  })
  
})
app.post('/getuserarticles',(req,res)=>{
  console.log(req.body)
  console.log(req.body.data.user)
  let sql='SELECT * FROM articles WHERE email=?'
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
  con.connect(function(err)
  {
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,req.body.data.user,function(err,result,fieds){
        if(err)
        {
          console.log(err)
        }
        else{
          console.log(result)
          res.send(result)
          res.end
        }
      })
    }
  })
})
app.post('/login',(req,res)=>{
    let sql='SELECT user,usuariofm FROM user WHERE (user =? OR email=?) AND password=? AND activo=?'
    let sql3='SELECT * FROM user WHERE (user=? or email=?) and activo=?'
    console.log("login");
    var con=mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "@Password123",
      database: "redes"
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
      
            }
            else{
                con.query(sql,[req.body.usuario,req.body.usuario,req.body.password,"yes"],function(err,result,fields){
                    if(err){
                        console.log(err)
                    }
                    if(result.length>0)
                    {
                      res.send(result)
                        //res.send(req.body.usuario)
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
    let sql='INSERT INTO user SET ?'
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
      password: "@Password123",
      database: "redes"
    });
    con.connect(function(err){
      if(err){
        console.log(err)
      }
      con.query(sql,post,function(err,result,fields){
        if(err)
        {
          console.log(err.sqlMessage)
         if(err.sqlMessage.includes("user.PRIMARY"))
         {
             res.send("user")
         }
         else if(err.sqlMessage.includes("user.email"))
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
            html: '<div style="text-align:center; width: 700px;margin-left: auto; margin-right: auto; border: 1px solid black;"><h2 style="background-color: #0096c7; color: white;">Music Site</h2><p>Hi '+req.body.fname+' '+req.body.lname+'! The last step to your registration <br>is activating your account by clicking the button below.</p><a href="http://25.92.32.84:5000/verify/'+req.body.email+'/'+rand+'"><button style="width: 200px; height: 40px; font-size: 20px; background-color: #0096c7; color: white; transition: 0.5s; margin-top: 10px;">Verify Email</button></a><br><p>If you did not request an email verification you can safely ignore this email.</p></div>', 
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