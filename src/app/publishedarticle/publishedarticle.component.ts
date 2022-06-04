import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-publishedarticle',
  templateUrl: './publishedarticle.component.html',
  styleUrls: ['./publishedarticle.component.css']
})
export class PublishedarticleComponent implements OnInit {
  url='http://25.83.103.75:5000/getspecific'
  url2='http://25.83.103.75:5000/rating'
  url3='http://25.83.103.75:5000/getuserrating'
  url4='http://25.83.103.75:5000/getarticletags'
  article:any
  obj:any={}
  obj3:any={}
  data:any
  urlimg:any
  rating:any
  tags:any
  ratingForm=new FormGroup({
    calificacion: new FormControl(''),
    mensaje: new FormControl('')
  })
  obj2:any={}
  get calificacion(){return this.ratingForm.get('calificacion')}
  get mensaje(){return this.ratingForm.get('mensaje')}
  constructor(private route:ActivatedRoute,private http: HttpClient) { 
    this.article=this.route.snapshot.paramMap.get('id')
    console.log(this.article)
    this.obj={
      "data":{"articleid":this.article}
    }
    this.http.post(this.url,this.obj,{responseType: 'json'}).subscribe((result)=>{
        console.log(result)
        this.data=result
        this.urlimg=this.data[0].imagepath
        this.http.post(this.url4,this.obj,{responseType: 'json'}).subscribe((result)=>{
          console.log(result)
          this.tags=result
        })
    })
    this.obj3={
      "data":{"articleid":this.article,"user":localStorage.getItem('user')}
    }
    this.http.post(this.url3,this.obj3,{responseType:'json'}).subscribe((result)=>{
        console.log(result)
      
      this.rating=result
    })
  }
  onSubmit(data:any){
    console.log(data)
    this.obj2={
      "data":{"articleid":this.article,"user":localStorage.getItem('user')}
    }
    this.http.post(this.url2,[this.obj2,data],{responseType:"text"}).subscribe((result)=>{
      console.log(result)
      if("result")
      {
        Swal.fire({
          title: 'Thank you for rating this column',
          text: ':)',
          icon: 'success',
          confirmButtonText: 'Done'
        }).then(function()
        {
          window.location.href = "http://localhost:4200/home";
        });
      }
    })
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
  getTags(data:any){
    window.location.href = "http://localhost:4200/tags/"+data; 
  }
  logeado2(){
    if(localStorage.getItem('user')==null || this.rating!=""  )
    {
      return false
    }
    else{
      return true
    }
  }
  logeado3(){
    if(localStorage.getItem('user')==null || this.rating!="" || localStorage.getItem('user')===this.data[0].email)
    {
      return false
    }
    else{
      return true
    }
  }
  ngOnInit(): void {
  }
  viewUser(data:any)
  {
    window.location.href = "http://localhost:4200/user/"+data;
  }
}
