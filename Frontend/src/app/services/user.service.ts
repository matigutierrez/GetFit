import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Usuario } from '../models/Usuario';

@Injectable()
export class UserService{
  
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ){
    
  }

  public signin(user): Observable<any> {
    return this._http.post(GLOBAL.url+'login', user);
  }

  public getIdentity(): string {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != "undefined") {
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  public getToken(): string {
    let token = JSON.parse(localStorage.getItem('token'));

    if (token != "undefined") {
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  public query(): Observable<Usuario> {
    return this._http.get<Usuario>(GLOBAL.url+'usuario');
  }
}
