import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()

export class VideoService 
{
    public URL: String;

    constructor(private _http: Http, )
    {
        this.URL= Global.url;
    }

    public guardarVideo(video_to_save)
    {
        let json = JSON.stringify(video_to_save);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'subir-video', params, {headers: headers}).map(res=> res.json());
    }


    public buscarVideo(video_to_find)
    {
        let json = JSON.stringify(video_to_find);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'obtener-video', params, {headers: headers}).map(res=> res.json());
    }

    public showVideos()
    {
        return this._http.get(this.URL+'videos').map(res=>res.json());
    }

    public eliminarVideo(id)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.delete(this.URL+'eliminar-video/'+id, options).map(res=> res.json());
    }

}