import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;
  public rol;

  constructor(
    public _http: HttpClient
  ){
    this.url = GLOBAL.url;
  }

  signup(user_to_json): Observable<any>{
    let json = JSON.stringify(user_to_json);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != "undefined") {
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token = JSON.parse(localStorage.getItem('token'));

    if (token != "undefined") {
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getUsuarios(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this.getToken());

    return this._http.get(this.url+'usuario', {headers: headers});
  }

  getRol(){
    return this.rol;
  }
}
