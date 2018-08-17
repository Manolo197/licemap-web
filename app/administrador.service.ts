import { Injectable } from '@angular/core';

@Injectable()
export class AdministradorService {

  videos:any[]= [ 

    { nombre: "El Nuevo Ministerio Público Investigador", descripcion:"Descripcion del video 1", embed:"ss0SG8LdchE" },
    { nombre: "Derechos humanos (Introducción)", descripcion: "Descripcion del video 2", embed: "m-ckpLB4Ckg"},
    { nombre: "La Teoría del Caso y su Interpretación Dialéctica", descripcion: "Descripcion del video 3", embed:"pRGWxYcCHqw"}
   ];

  constructor() { }

  returnMovies()
  {
     return this.videos;  
  }

}
