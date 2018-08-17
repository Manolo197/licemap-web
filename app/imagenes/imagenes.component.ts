import { Component, OnInit } from '@angular/core';
import { Imagenes } from '../modelos/imagenes';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { Global }  from './../services/global';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  providers: [UserService, ImageService]
  
})
export class ImagenesComponent implements OnInit {

  imagen: Imagenes;
  public token;
  public identity
  public url: string;
  public imagenes;
  public alert1:boolean;
  public alert2:boolean;
  public mensaje:string;
  public mensaje2:string;

  constructor(private _userService: UserService, private _imageService: ImageService) { 
    this.imagen= new Imagenes('','');
    this.url='http://localhost:4000/api/'
    this.alert1=false;
    this.alert2=false;
    this.mensaje='';
    this.mensaje2='';
    this.imagenes=new Array();
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
  }

  public filesToUpload: Array<File>;

  public fileChangeEvent(fileInput: any)
  {
    this.filesToUpload= <Array<File>>fileInput.target.files;
  }

  public makeFileRequest(url: string, params: Array<string>, files: Array<File>)
  {
    return new Promise(function(resolve, reject)
    {
      var formData: any = new FormData();
      var xhr= new XMLHttpRequest();

      for(var i=0; i<files.length; i++)
      {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange=function()
      {
        if(xhr.readyState==4)
        {
          if(xhr.status==200)
          {
            resolve(JSON.parse(xhr.response));
          }
          else
          {
            reject(xhr.response);

          }
        }
      }
      xhr.open('POST', url, true);
      xhr.send(formData);

    });
  }

  public subirImagen()
  {
    if(!this.filesToUpload)
    {
      this.alert1=true;
      this.mensaje='Por favor seleccione una imagen.'
    }
    else
    {
      this.makeFileRequest(this.url+'guardar-imagen',[], this.filesToUpload).then((result: any)=>
      {
        if(!result)
        {
        this.alert1=true;
        this.mensaje='Ha ocurrido un error';        
        }
        else
        {
        this.imagen.nombre=result.imagen;
        this.alert1=true;
        this.mensaje='La imagen se ha subido con exito';
        this.imagenes=[];
        this.mostrarImagenes();
        }
      });
    }
  }

  ngOnInit() {
    this.mostrarImagenes();
  }

  public mostrarImagenes()
  {
    this._imageService.mostrarImagenes().subscribe(
      response=>
      {
        response.docs.forEach(element=>
        {
          this.imagenes.push(element);
        });
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

  public getImage(nombre)
  {
    return this.url+'obtener-imagen/'+nombre;
  }

  public eliminarImagen(id)
  {
    this._imageService.eliminarImage(id).subscribe(
      response=>
      {
        if(!response)
        {
          this.alert2=true;
          this.mensaje2='No se pudo eliminar la imagen'
        }
        else
        {
          this.alert2=true;
          this.mensaje2='La imagen se ha eliminado con exito.'
          this.imagenes=[];
        this.mostrarImagenes();
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

}
