import { Component } from '@angular/core';
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
  logout()
  {
    localStorage.removeItem('user')
    localStorage.removeItem('usuariofm')
  }
  viewUser()
  {
    window.location.href = "http://localhost:4200/user/"+localStorage.getItem('user');
  }
}
