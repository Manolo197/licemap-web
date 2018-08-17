import { Component, OnInit } from '@angular/core';
import { Videos } from '../modelos/videos';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-movie-up',
  templateUrl: './movie-up.component.html',
  providers: [VideoService, UserService] 
})
export class MovieUpComponent implements OnInit {

  datos:boolean;
  video: Videos;
  public video_to_delete: Videos;
  public token;
  public identity;
  public mensaje: String;
  public alert: boolean;
  public alert2: boolean;
  public alert3:boolean;
  public busqueda;
  public embedx: String;

  constructor( private sanitizer:DomSanitizer, private _userService: UserService, private _videoService: VideoService) { 
    this.datos=false;
    this.busqueda=false;
    this.video= new Videos('','','','');
    this.video_to_delete= new Videos('','','','');
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.alert=false;
    this.alert2=false;
    this.alert3=false;
    this.mensaje='';
    this.embedx="";
  }

  ngOnInit() {
  }

  public getDatos()
  {
    if(this.video.nombre=='' || this.video.description=='' || this.video.embed=='')
    {
      this.mensaje= 'Por favor rellene todos los campos.';
      this.alert=true;
    }
    else
    {
      this.datos=true;
      console.log(this.video);
    }
    
  }

  public getURL()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.video.embed);
  }

  public getURL2()
  {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.video_to_delete.embed);
  }

  public guardarVideos()
  {
    this._videoService.guardarVideo(this.video).subscribe(
      response =>
      {
        let video= response.video;
            this.video= video;
            if(!this.video._id)
            {
              alert('Error al guardar el video.');
            }
            else
            {
              this.alert=true;
              this.mensaje='Se ha guardado el video satisfactoriamente';
              this.datos=false;
              this.video= new Videos('','','','');
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

  public buscarVideos()
  {
    if(this.video_to_delete.embed=="")
    {
      this.mensaje="Es necesario el codigo de inserccion, de lo contrario, no se mostrara el video."
      this.alert2=true;
      this.busqueda=false;
    }
    else
    {

      this._videoService.buscarVideo(this.video_to_delete).subscribe(
        response=>
        {
          
          let video= response.video;
          this.video_to_delete= video;
        },
        error=>
        {
          let errorMensaje= <any>error;
        if(errorMensaje!=null)
        {
          console.log(error._body.video.nombre);
          
        }
        }
      );

      this.alert2=false;
      this.busqueda=true;
      
    }
  }

  public deleteVideo()
  {
    this._videoService.eliminarVideo(this.video_to_delete._id).subscribe(
      response=>
      {
        if(!response)
        {
          this.alert2=true;
          this.mensaje="No se ha podido eliminar el video.";
        }
        else
        {
          this.alert3=true;
          this.mensaje="Se ha eliminado el video de manera correcta"
          this.busqueda=false;
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

