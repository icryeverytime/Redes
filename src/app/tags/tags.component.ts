import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tag:any
  obj:any={}
  data:any
  url='http://25.83.103.75:5000/gettags'
  constructor(private route:ActivatedRoute,private http: HttpClient) { 
    this.tag=this.route.snapshot.paramMap.get('tags')
    this.obj=
      {
        "data": {"search": this.tag} 
      } 
    this.http.post(this.url,this.obj,{responseType: 'json'}).subscribe((result)=>{
      this.data=result
      console.log("resultado")
      console.log(this.data)
    })
  }
  ngOnInit(): void {
  }
  searchUser(data:any){
    window.location.href='http://localhost:4200/user/'+data

  }
  viewArticle(data:any)
  {
    window.location.href='http://localhost:4200/publishedarticles/'+data
  }
  return(data:any)
  {
    return "http://25.83.103.75:5000/images/"+data
  }

}
