const express=require('express')
const app=express()
const axios=require('axios')
var mysql=require('mysql')
const { post } = require('request')
    let sql="SELECT usuariofm,email FROM User WHERE NOT usuariofm='null'"
  var con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "Redes"
  })
  con.connect(function(err){
    if(err)
    {
      console.log(err)
    }
    else{
      con.query(sql,async function(err,result,fields){
        if(err)
        {
          console.log(err)
        }
        else{
          for(var i=0;i<result.length;i++)
          {
            const url1='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user='+result[i].usuariofm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
            const url2='http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user='+result[i].usuariofm+'&api_key=604024e30367d14d43eda34672a72cf2&format=json'
            console.log(result[i].usuariofm)
            console.log(result[i].email)
            await axios.get(url1).then(res => {
                let sql2='UPDATE Albums SET ? WHERE correo=?'
                let post1=({
                    album1: res.data.weeklyalbumchart.album[0].name,
                    album2: res.data.weeklyalbumchart.album[1].name,
                    album3: res.data.weeklyalbumchart.album[2].name,
                    album4: res.data.weeklyalbumchart.album[3].name,
                    album5: res.data.weeklyalbumchart.album[4].name
                })
                con.query(sql2,[post1,result[i].email],function(err,result,fields){
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
                    let sql2='UPDATE Artists SET ? WHERE correo=?'
                    let post1=({
                        artist1: res.data.weeklyartistchart.artist[0].name,
                        artist2: res.data.weeklyartistchart.artist[1].name,
                        artist3: res.data.weeklyartistchart.artist[2].name,
                        artist4: res.data.weeklyartistchart.artist[3].name,
                        artist5: res.data.weeklyartistchart.artist[4].name
                    })
                    con.query(sql2,[post1,result[i].email],function(err,result,fields){
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

          }
        }
      })
    }
  })
