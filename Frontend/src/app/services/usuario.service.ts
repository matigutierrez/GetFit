import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class UsuarioService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'usuario', params, {headers: headers});
  }

  getUsuario(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'usuario', {headers: headers});
  }

  getUsuarioId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'usuario/'+params, {headers: headers});
  }

  deleteUsuarioId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.delete(this.url+'usuario/'+params, {headers: headers});
  }
}