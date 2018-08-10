import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../modelos/usuarios';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  providers: [UserService]
})
export class AdministradorComponent implements OnInit {

  public user: Usuarios;
  public identity;
  public token;
  public datos: boolean;
  public mensaje: string;
  public errorMensaje;

  constructor(private _userService: UserService, private _router: Router) {
    this.user= new Usuarios('','','');
    this.datos=false;
    this.mensaje="";
   }

  ngOnInit() {
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);
  }

  iniciarSesion()
  {
    if(this.user.username=="" || this.user.password=="")
    {
      this.datos=true;
      this.mensaje="Por favor, llene todos los campos";
    }
    else
    {
    
      this._userService.singUp(this.user).subscribe(
        response =>
        {
          let identity = response.user;
          this.identity= identity;

          if(!identity._id)
          {
            alert('El usuario no esta siendo identificado.');
          }
          else
          {
            //Crear elemento en el local storage
            localStorage.setItem('identity', JSON.stringify(identity));

            this._userService.singUp(this.user, 'true').subscribe(
              response =>
              {
                let token = response.token;
                this.token= token;
      
                if(this.token.length<=0)
                {
                  alert('El token no se ha generado');
                }
                else
                {
                  //Crear elemento en el local storage para tener token disponble

                  localStorage.setItem('token', token);
                  this._router.navigate(['/Users']);
                }
              },
              error =>
              {
                this.errorMensaje= <any>error;
                if(this.errorMensaje!=null)
                {
                  console.log(error);
                }
              }
            );
          }
        },
        error =>
        {
          this.errorMensaje= <any>error;
          if(this.errorMensaje!=null)
          {
            console.log(error);
          }
        }
      );
    }
  }

}
