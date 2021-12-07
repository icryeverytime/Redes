import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
function validatePass(control:AbstractControl):ValidationErrors | null{
  if(control)
  {
    if(control.get('password')?.value!=null && control.get('spassword')?.value!=null)
    {
      if(control.get('password')?.value!=control.get('spassword')?.value)
      {
        control.get('spassword')?.setErrors({passwordcompare:true});
      }
    }
  }
  return null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  url='http://25.83.103.75:5000/registro'
  public data:any=[]
  public json:any=[]

  constructor(private router: Router,private http: HttpClient) { }
  
  ngOnInit(): void {
  }
  profileForm=new FormGroup({
    fname: new FormControl('',[Validators.required]),
    lname: new FormControl('',[Validators.required]),
    user: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    spassword: new FormControl('',[Validators.required]) 
  },validatePass)

  get email(){return this.profileForm.get('email')}
  get fname(){return this.profileForm.get('fname')}
  get lname(){return this.profileForm.get('lname')}
  get user(){return this.profileForm.get('user')}
  get password(){return this.profileForm.get('password')}
  get spassword(){return this.profileForm.get('spassword')}
  onSubmit(data:any,formData: any){
    console.log(data)
    this.http.post(this.url,data,{responseType: 'text'}).subscribe((result)=>{
      console.log("result:",result);
      if(result=="user")
      {
        formData.form.controls['user'].setErrors({'incorrect': true});
      }
      else if(result=="email")
      {
        formData.form.controls['email'].setErrors({'incorrect': true});
      }
      else{
        console.log("yes");
        Swal.fire({
          title: 'Account created succesfully',
          text: 'Last step is to verify your email. We have sent a verification link to the email',
          icon: 'success',
          confirmButtonText: 'Done'
        }).then(function()
        {
          window.location.href = "http://localhost:4200/login";
        });
      }
    });
    return null;

  }
}