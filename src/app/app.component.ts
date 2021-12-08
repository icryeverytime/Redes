import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
  }
}
