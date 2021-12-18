import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subida-posts',
  templateUrl: './subida-posts.component.html',
  styleUrls: ['./subida-posts.component.css']
})
export class SubidaPostsComponent implements OnInit {
  data:any=[]
  constructor(private http: HttpClient) { }
  selectedFile:any
  obj:any={}
  url='http://25.83.103.75:5000/article'
  url2='http://25.83.103.75:5000/articlepost'
  ngOnInit(): void {
  }
  articleForm=new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    pop: new FormControl('',[]),
    hiphop: new FormControl('',[]),
    rock: new FormControl('',[]),
    country: new FormControl('',[]),
    rb: new FormControl('',[]),
    classical: new FormControl('',[]),
    regional: new FormControl('',[]),
    jazz: new FormControl('',[]),
    edm: new FormControl('',[]),
    soul: new FormControl('',[]),
    texto: new FormControl('',[Validators.required]),
    imagen: new FormControl('',[Validators.required])
  })
  fd=new FormData()
  get titulo(){return this.articleForm.get('titulo')}
  get pop(){return this.articleForm.get('pop')}
  get hiphop(){return this.articleForm.get('hiphop')}
  get rock(){return this.articleForm.get('rock')}
  get country(){return this.articleForm.get('country')}
  get rb(){return this.articleForm.get('rb')}
  get classical(){return this.articleForm.get('cassical')}
  get regional(){return this.articleForm.get('regional')}
  get jazz(){return this.articleForm.get('jazz')}
  get edm(){return this.articleForm.get('edm')}
  get soul(){return this.articleForm.get('soul')}
  get texto(){return this.articleForm.get('texto')}
  get imagen(){return this.articleForm.get('file')}
  onFileSelected(data2:any){
    this.selectedFile=data2.target.files[0]
  }
  onSubmit(data:any){
    console.log(data)
    this.fd.append('file',this.selectedFile)
    this.http.post(this.url,this.fd,{responseType: 'json'}).subscribe((result)=>{
      console.log("REsultado:")
      console.log(result)
      this.data=result
      console.log(this.data["insertId"])
      this.obj=
      {
        "data": {"insertId": this.data["insertId"], "email":localStorage.getItem('user')} 
      }
      this.http.post(this.url2,[data,this.obj],{responseType: 'text'}).subscribe((result)=>{
        console.log(result)
        if(result=="ingresado")
        {
          Swal.fire({
            title: 'Article created succesfully',
            text: 'THank you for participating in this survery',
            icon: 'success',
            confirmButtonText: 'Done'
          }).then(function()
          {
            window.location.href = "http://localhost:4200/articles";
          });
        }
      })
    })

  }

}
