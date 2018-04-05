import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class UserService{
  
  public identity;
  public token;

  constructor(
    public _http: HttpClient
  ){
    
  }

  signin(user): Observable<any>{
    return this._http.post(GLOBAL.url+'login', user);
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

  query(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this.getToken());

    return this._http.get(GLOBAL.url+'usuario', {headers: headers});
  }
}
