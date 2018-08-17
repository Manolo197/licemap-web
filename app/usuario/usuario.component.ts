import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../modelos/usuarios';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  providers: [UserService]
})
export class UsuarioComponent implements OnInit {

  public user: Usuarios;
  public token;
  public identity;
  public mensaje: string;
  public pass: string;
  public datos: boolean;
  public registro: boolean;
  public admins: Array<any>;
  public admons: Array<String>;
  public boton: boolean;

  constructor(private _userService: UserService, private _router: Router) {
    this.user= new Usuarios('','','');
    this.mensaje="";
    this.datos=false;
    this.pass="";
    this.registro=false;
    this.admons=[];
    this.boton=false;
    }

  ngOnInit() {
    this.token=this._userService.getToken();
    this.identity= this._userService.getIdentity();
    this.mostrarUsuarios();

  }

  public mostrarUsuarios()
  {
    this._userService.showUsers().subscribe(
      response=>
      {
        this.admins=response;

        this.admins.forEach(element=>
        {
          this.admons.push(element);
        });

        if(this.admons.length>=3)
        {
          this.boton=true;
        }
        else
        {
          this.boton=false;
        }
      },
      error=>
      {
        let errorMensaje= <any>error;
        if(errorMensaje!=null)
        {
          console.log(error);
        }
      }
    );
  }

  public deleteUser(id)
  {
    this._userService.deleteUsers(id).subscribe(
      response=>
      {
        if(!response)
        {
          alert('Error en el servidor');
        }
        else
        {
          this.admons=[];
          this.mostrarUsuarios();
        }
      },
      error=>
      {
        let errorMensaje= <any>error;
                if(errorMensaje!=null)
                {
                  console.log(error);
                }
      }
    );
  }

  public registrar(pass)
  {
    this.pass=pass;
    console.log(this.user);
    if(this.user.username=="" || this.user.password=="" || this.pass=="")
    {
      this.datos=true;
      this.mensaje="Por favor, llene todos los campos."
    }
    else
    {
      if(pass!=this.user.password)
      {
          this.datos=true;
          this.mensaje="Las contraseñas deben coincidir para el registro";
      }
      else
      {
        this._userService.register(this.user).subscribe(
          response=>
          {
            let usuario= response.usuario;
            this.user= usuario;
            if(!this.user._id)
            {
              alert('Error al registrarse');
            }
            else
            {
              this.registro=true;
              this.mensaje="Se ha registrado al usuario correctamente";
              this.user= new Usuarios('','','');
              this.datos=false;
              this.admons=[];
              this.mostrarUsuarios();
            }
          },
          error =>
          {
            let errorMensaje= <any>error;
                if(errorMensaje!=null)
                {
                  console.log(error);
                }
          }
        );
      }
    }
  }

}
