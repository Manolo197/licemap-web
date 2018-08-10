import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Cursos } from '../modelos/cursos';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CourseService]
})
export class CursosComponent implements OnInit {

  public error:boolean;
  public message:String;
  public curso: Cursos;
  public temas;
  public cursos;

  constructor(private _courseService: CourseService) { 
    this.error=false;
    this.message='';
    this.temas=new Array();
    this.cursos=new Array();
  }

  ngOnInit() {
    this.showCourses();
  }

  public getId(id)
  {
    return '#'+id;
  }

  public showCourses()
  {
    this._courseService.obtenerCursos().subscribe(
      response=>
      {
        if(!response)
        {
        this.error= true;
        this.message= 'Ha ocurrido un error al mostrar los cursos, intentelo mas tarde';
        }
        else
        {
         
          response.docs.forEach(element => {
            this.cursos.push(element);
          });
          console.log(this.cursos);
        }
      },
      error=>
      {
        this.error= true;
        this.message= 'Ha ocurrido un error al mostrar los cursos, intentelo mas tarde';
      }
    );
  }

}
