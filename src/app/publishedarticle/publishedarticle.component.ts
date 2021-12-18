import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-publishedarticle',
  templateUrl: './publishedarticle.component.html',
  styleUrls: ['./publishedarticle.component.css']
})
export class PublishedarticleComponent implements OnInit {
  url='http://25.83.103.75:5000/getspecific'
  article:any
  obj:any={}
  data:any
  urlimg:any
  constructor(private route:ActivatedRoute,private http: HttpClient) { 
    this.article=this.route.snapshot.paramMap.get('id')
    console.log(this.article)
    this.obj={
      "data":{"articleid":this.article}
    }
    this.http.post(this.url,this.obj,{responseType: 'json'}).subscribe((result)=>{
        console.log(result)
        this.data=result
        this.urlimg="http://25.83.103.75:5000/images/"+this.data[0].imagepath
    })
  }

  ngOnInit(): void {
  }
  viewUser(data:any)
  {
    window.location.href = "http://localhost:4200/user/"+data;
  }
}
