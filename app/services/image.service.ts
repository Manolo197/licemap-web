import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()

export class ImageService
{
    public url: string;

    constructor(private _http: Http)
    {
        this.url= Global.url;
    }

    public mostrarImagenes()
    {
        return this._http.get(this.url+'obtener-imagenes').map(res=> res.json());
    }

    public eliminarImage(id)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.delete(this.url+'eliminar-imagen/'+id, options).map(res=> res.json());
    }

    

}