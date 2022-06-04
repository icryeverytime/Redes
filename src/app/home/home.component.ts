import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:any=[]
  length:any
  oldurl1:any
  oldurl2:any
  oldurl3:any
  artists:any
  albums:any
  newurl1:any
  newurl2:any
  newurl3:any

  random1:any
  random2:any
  random3:any

  randomurl1:any
  randomurl2:any
  randomurl3:any

  recomendado1:any
  resultrecomendado:any
  recommended:any=[]
  recomendado2:any
  obj:any={}

  url='http://25.83.103.75:5000/getarticles'
  url2='http://25.83.103.75:5000/highlyrated'
  url3='http://25.83.103.75:5000/getartist'
  url4='http://25.83.103.75:5000/getalbum'
  rated:any
  urlrated1:any
  urlrated2:any
  urlrated3:any
  rated1:any
  rated2:any
  rated3:any
  constructor(private http: HttpClient) { 
    this.http.post(this.url,{responseType: 'json'}).subscribe((result)=>{
      console.log(result)
      this.data=result
      this.length=this.data["length"]
      this.obj=
      {
        "data": {"search": localStorage.getItem('user')} 
      } 
      this.http.post(this.url3,this.obj,{responseType:'json'}).subscribe((result)=>{
        this.artists=result
        console.log(this.artists[0])
        for(var i=0;i<this.length;i++)
        {
            console.log(this.data[i]["title"]); 
            if(this.data[i]["title"].includes(this.artists[0]["artist1"]) || this.data[i]["title"].includes(this.artists[0]["artist2"]) || this.data[i]["title"].includes(this.artists[0]["artist3"]) || this.data[i]["title"].includes(this.artists[0]["artist4"]) || this.data[i]["title"].includes(this.artists[0]["artist5"]))
            {
              console.log("includes")
              this.recommended.push(this.data[i])
              console.log(this.recommended)
            }
        }
      })
      this.http.post(this.url4,this.obj,{responseType:'json'}).subscribe((result)=>{
        this.albums=result
        console.log(this.albums[0])
        for(var i=0;i<this.length;i++)
        {
            console.log(this.data[i]["title"]); 
            if(this.data[i]["title"].includes(this.albums[0]["album1"]) || this.data[i]["title"].includes(this.albums[0]["album2"]) || this.data[i]["title"].includes(this.albums[0]["album3"]) || this.data[i]["title"].includes(this.albums[0]["album4"]) || this.data[i]["title"].includes(this.albums[0]["album5"]))
            {
              console.log("includes")
              this.recommended.push(this.data[i])
              console.log(this.recommended)
            }
        }
      })

  
      this.newurl1=this.data[this.length-3]["imagepath"]
      this.newurl2=this.data[this.length-2]["imagepath"]
      this.newurl3=this.data[this.length-1]["imagepath"]
      this.oldurl1=this.data[0]["imagepath"]
      this.oldurl2=this.data[1]["imagepath"]
      this.oldurl3=this.data[2]["imagepath"]
      this.random1=Math.floor(Math.random()*((this.length-1)+1))
      do{
        this.random2=Math.floor(Math.random()*((this.length-1)+1))
      }while(this.random2==this.random1)
      do{
        this.random3=Math.floor(Math.random()*((this.length-1)+1))
      }while(this.random3==this.random2 || this.random3==this.random1)
      this.randomurl1=this.data[this.random1]["imagepath"]
      this.randomurl2=this.data[this.random2]["imagepath"]
      this.randomurl3=this.data[this.random3]["imagepath"]
    })
    this.http.get(this.url2,{responseType:'json'}).subscribe((result)=>{
      console.log(result)
      this.rated=result
    })  
    
  }
  ngOnInit(): void {

  }
  logeado(){
    if(localStorage.getItem('user')==null)
    {
      return false
    }
    else{
      return true
    }
  }
  return(data:any)
  {
    return data
  }
  viewUser(data:any)
  {
    window.location.href = "http://localhost:4200/user/"+data;
  }
  viewArticle(data:any){
    window.location.href = "http://localhost:4200/publishedarticles/"+data;    
  }
  getTags(data:any){
    window.location.href = "http://localhost:4200/tags/"+data; 
  }
}
