import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
  providers: [UserService]
})
export class CabeceraComponent implements OnInit {

  public token;
  public identity;
  constructor(private _userService: UserService, private _router: Router) {
    
   }

  ngOnInit() {
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
  }


  public cerrarSesion()
  {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity= null;
    this.token= null;
    this._router.navigate(['/'])
  }

}
