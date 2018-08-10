import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable()

export class UserService
{
    public URL: string; //URL de la api.
    public identity;
    public token:string;

    constructor(private _http: Http)
    {
        this.URL= Global.url;
    }

    public singUp(user_to_login, getHash=null)
    {
        if(getHash!=null)
        {
            user_to_login.getHash=getHash
        }

        //Paso de parametros en formato JSON.
        let json = JSON.stringify(user_to_login);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'login', params, {headers: headers}).map(res=> res.json());
    }

    public register(user_to_register)
    {
        //Paso de parametros en formato JSON.
        let json = JSON.stringify(user_to_register);
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.URL+'registro', params, {headers: headers}).map(res=> res.json());
    }

    public showUsers()
    {
        return this._http.get(this.URL+'usuarios').map(res=> res.json());
    }

    public deleteUsers(id)
    {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this._http.delete(this.URL+'delete/'+id, options).map(res=> res.json());
    }

    public getIdentity()
    {
        let identity= localStorage.getItem('identity');
        if(identity!='undefined')
        {
            this.identity=identity;
        }
        else
        {
            this.identity=null;
        }

        return this.identity;
    }

    public getToken()
    {
        let token = localStorage.getItem('token');

        if(token!= "undefined")
        {
            this.token= token;
        }
        else
        {
            this.token="null";
        }
        return this.token;
    }

    }
