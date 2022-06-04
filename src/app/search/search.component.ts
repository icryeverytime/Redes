import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
search:any
url1='http://25.83.103.75:5000/searchuser'
//url1='http://25.92.32.84:5000/searchuser'
url2='http://25.83.103.75:5000/searcharticle'
url3='http://25.83.103.75:5000/searchcontent'
result1:any
result2:any
result3:any
obj:any={}  
constructor(private route:ActivatedRoute,private http: HttpClient) {
    this.search=this.route.snapshot.paramMap.get('search') 
    this.obj=
      {
        "data": {"search": this.search} 
      }
      this.http.post(this.url1,this.obj ,{responseType: 'json'}).subscribe((result)=>{
        this.result1=result
      })
      this.http.post(this.url2,this.obj ,{responseType: 'json'}).subscribe((result)=>{
        this.result2=result
        console.log(this.result2)
      })
      this.http.post(this.url3,this.obj,{responseType: 'json'}).subscribe((result)=>{
        this.result3=result
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
    return data
  }
}
