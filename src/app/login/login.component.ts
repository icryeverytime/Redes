import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  url='http://25.83.103.75:5000/login'
  constructor(private router: Router,private http: HttpClient) { }
  loginForm=new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  ngOnInit(): void {
  }
  get password(){return this.loginForm.get('password')}
  get usuario(){return this.loginForm.get('usuario')}
  onSubmit(data:any,formData: any)
  {
    console.log(data)
    this.http.post(this.url,data,{responseType: 'text'}).subscribe((result)=>{
      console.log("Result: "+result)
      if(result=="No esta verificado el correo"){
        formData.form.controls['usaurio'].setErrors({'verification':true})
      }
      else if(result=="No existe una cuenta con estas credenciales")
      {
        formData.form.controls['usaurio'].setErrors({'match':true})
      }
      else{
        localStorage.setItem('user',result)
        window.location.href = "http://localhost:4200/home";
      }
    })
  }

}
