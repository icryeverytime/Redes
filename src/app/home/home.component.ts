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

  newurl1:any
  newurl2:any
  newurl3:any

  random1:any
  random2:any
  random3:any

  randomurl1:any
  randomurl2:any
  randomurl3:any

  url='http://25.83.103.75:5000/getarticles'
  constructor(private http: HttpClient) { 
    this.http.post(this.url,{responseType: 'json'}).subscribe((result)=>{
      console.log(result)
      this.data=result
      this.length=this.data["length"]
      this.newurl1="http://25.83.103.75:5000/images/"+this.data[this.length-3]["imagepath"]
      this.newurl2="http://25.83.103.75:5000/images/"+this.data[this.length-2]["imagepath"]
      this.newurl3="http://25.83.103.75:5000/images/"+this.data[this.length-1]["imagepath"]
      this.oldurl1="http://25.83.103.75:5000/images/"+this.data[0]["imagepath"]
      this.oldurl2="http://25.83.103.75:5000/images/"+this.data[1]["imagepath"]
      this.oldurl3="http://25.83.103.75:5000/images/"+this.data[2]["imagepath"]
      this.random1=Math.floor(Math.random()*((this.length-1)+1))
      do{
        this.random2=Math.floor(Math.random()*((this.length-1)+1))
      }while(this.random2==this.random1)
      do{
        this.random3=Math.floor(Math.random()*((this.length-1)+1))
      }while(this.random3==this.random2 || this.random3==this.random1)
      this.randomurl1="http://25.83.103.75:5000/images/"+this.data[this.random1]["imagepath"]
      this.randomurl2="http://25.83.103.75:5000/images/"+this.data[this.random2]["imagepath"]
      this.randomurl3="http://25.83.103.75:5000/images/"+this.data[this.random3]["imagepath"]
    })  
  }
  ngOnInit(): void {

  }
  viewUser(data:any)
  {
    window.location.href = "http://localhost:4200/user/"+data;
  }
  viewArticle(data:any){
    window.location.href = "http://localhost:4200/publishedarticles/"+data;    
  }

}
