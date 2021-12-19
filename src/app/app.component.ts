import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){
  }
  title = 'redes';
  User=localStorage.getItem('user')
  readLocalStorageValue()
  {
    if(localStorage.getItem('user')==null)
    {
      return true
    }
    else{
      return false
    }
  }
  busquedaForm=new FormGroup({
    search: new FormControl('')
  })
  get search(){return this.busquedaForm.get('search')}
  logout()
  {
    localStorage.removeItem('user')
    localStorage.removeItem('usuariofm')
    window.location.href = "http://localhost:4200/user/"
  }
  viewUser()
  {
    window.location.href = "http://localhost:4200/user/"+localStorage.getItem('user');
  }
  onSubmit(data:any)
  {
    console.log(data)
    window.location.href= "http://localhost:4200/search/"+data.search;
  }
  
}
