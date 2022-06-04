const port=3000
const express=require('express')
const app=express()
const mysql=require('mysql')
var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@Password123",
    database: "redes"
  })
con.connect(function(err){
    let sql='SELECT email FROM user'
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("conexion")
        con.query(sql,function(err,result){
            if(err)
            {
                console.log(err)
            }
            else{
                console.log(result)
            }

        })
    }
})