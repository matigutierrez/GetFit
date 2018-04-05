import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class RolService{
  
  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    
  }

  save(rol): Observable<any>{
    return this._http.post(GLOBAL.url+'rol', rol);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'rol');
  }

  getRolSesion(): Observable<any>{
    return this._http.get(GLOBAL.url+'usuariorol');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'rol/'+id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'rol/'+id);
  }
}