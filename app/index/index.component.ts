import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoService } from './../services/video.service';
import { ImageService } from './../services/image.service';
import { Global } from './../services/global';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  providers: [VideoService, ImageService]
})
export class IndexComponent implements OnInit {

  public videos= new Array();
  public data= new Array();
  public imagenes= new Array();
  public url;

  constructor(private _videoService: VideoService, private sanitizer:DomSanitizer, private _imageService: ImageService) {
    this.videos= [];
    this.data=[];
    this.imagenes=[];
    this.url=Global.url;
  }

  ngOnInit() {
    this.mostrarUsuarios();
    this.showImage();
  }

  getEmbedURL(video)
  {

    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+video);

  }

  public getImage(nombre)
    {
        return 'http://localhost:4000/api/obtener-imagen/'+nombre;
    }

    public getNumber(numero:number)
    {
      return numero-4
    }

  public showImage()
  {
    this._imageService.mostrarImagenes().subscribe(
      response=>
      {
        response.docs.forEach(element => {
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

  public mostrarUsuarios()
  {
    this._videoService.showVideos().subscribe(
      response=>
      {
        this.data= response;
        this.data.forEach(element => {
          this.videos.push(element);
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

  public getImagen(nombre)
  {
    return this.url+'obtener-imagen/'+nombre;
  }

}
