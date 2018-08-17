import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()

export class CourseService
{
    public URL: String;

    constructor(private _http: Http)
    {
        this.URL= Global.url;
    }

    public guardarCurso(course_to_save)
    {
        let json = JSON.stringify(course_to_save);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'guardar-curso', params, {headers: headers}).map(res=> res.json());
    }

    public obtenerCurso(course_to_find)
    {
        let json = JSON.stringify(course_to_find);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'obtener-curso', params, {headers: headers}).map(res=> res.json());
    }

    public deleteCurso(id)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.delete(this.URL+'eliminar-curso/'+id, options).map(res=> res.json());
    }

    public obtenerCursos()
    {
        return this._http.get(this.URL+'obtener-cursos').map(res=> res.json());
    }
}