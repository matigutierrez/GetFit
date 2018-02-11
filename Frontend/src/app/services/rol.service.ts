import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class RolService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(rol): Observable<any>{
    let params = JSON.stringify(rol);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'rol', params, {headers: headers});
  }

  getRol(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'rol', {headers: headers});
  }

  getRolSesion(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'usuariorol', {headers: headers});
  }

  getRolId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'rol/'+params, {headers: headers});
  }

  deleteRolId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.delete(this.url+'rol/'+params, {headers: headers});
  }
}