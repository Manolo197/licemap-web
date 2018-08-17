import { Component, OnInit } from '@angular/core';
import { Cursos } from '../modelos/cursos';
import { UserService } from '../services/user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-subir-curso',
  templateUrl: './subir-curso.component.html',
  providers: [UserService, CourseService]
})
export class SubirCursoComponent implements OnInit {

  curso: Cursos;
  public course_to_delete: Cursos
  datos: boolean;
  temas = new Array();
  temas2 = new Array();
  public mensaje;
  public mensaje2;
  public token;
  public identity;
  public alert: boolean;
  public alert2: boolean;
  public alert3: boolean;
  public datos2;
  public fail:boolean;
  public complete: boolean;

  constructor(private _userService: UserService, private _courseService: CourseService) { 
    this.datos=false;
    this.alert=false;
    this.alert2=false;
    this.alert3=false;
    this.complete=false;
    this.fail=true;
    this.curso= new Cursos('','','', ['']);
    this.course_to_delete= new Cursos('','','', ['']);
    this.temas=[];
    this.temas2=[];
    this.mensaje="";
    this.datos2= false;
    this.mensaje2="";
    this.token=this._userService.getToken();
    this.identity= this._userService.getIdentity();
  }

  ngOnInit() {
  }

  public onClick(tema)
  {
    length = this.curso.temas.push(tema);
    this.temas=this.curso.temas;

  }

  public getDatos()
  {
    if(this.curso.nombre=='' || this.curso.description=='')
    {
      this.alert=true;
      this.mensaje='Por favor llene todos los campos';
    }
    else
    {
      this.datos=true;
    }
  }

  public guardarCurso()
  {
    this._courseService.guardarCurso(this.curso).subscribe(
      response=>
      {
        let courses= response.curso;
        this.curso= courses;
        if(!this.curso._id)
        {
          this.alert=true;
          this.mensaje='No se ha podido registrar el usuario,'
        }
        else
        {
          this.alert2=true;
          this.mensaje='Se ha guardado el curso satisfactoriamente';
          this.curso= new Cursos('','','',['']);
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

  public buscarCurso()
  {
    if(this.course_to_delete.nombre=="")
    {
        this.alert3=true;
        this.mensaje2="Por favor, introduzca el nombre del curso que desea eliminar."
    }
    else
    {
      this._courseService.obtenerCurso(this.course_to_delete).subscribe(
        response=>
        {
          let course= response.course;
          this.course_to_delete= course;
          console.log(this.course_to_delete);
          this.datos2=true;
          this.temas2= this.course_to_delete.temas;
        },
        error=>
        {
          this.alert3=true;
        this.mensaje2="El curso que busca no esta registrado"
        }
      );

    }
  }

  public eliminarCurso()
  {
    this._courseService.deleteCurso(this.course_to_delete._id).subscribe(
      response=>
      {
        if(!response)
        {
          this.alert3=true;
          this.mensaje2="No se ha podido eliminar el curso :c";
        }
        else
        {
          this.complete=true;
          this.mensaje2='Se ha eliminado el video satisfactoriamente.'
          this.course_to_delete= new Cursos ('','','',['']);
          this.datos2=false;
        }
      },
      error=>
      {

      }
    );
  }

}
