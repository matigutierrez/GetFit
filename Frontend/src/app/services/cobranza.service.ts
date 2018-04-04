import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class CobranzaService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  save(cobranza): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'cobranza', cobranza, {headers: headers});
  }

  query(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'cobranza', {headers: headers});
  }

  get(id): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'cobranza/' + id, {headers: headers});
  }

  delete(id): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.delete(this.url+'cobranza/' + id, {headers: headers});
  }

  getCobranzasCliente(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'clientecobranzas', {headers: headers});
  }


}