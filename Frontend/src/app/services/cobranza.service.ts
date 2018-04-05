import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class CobranzaService{
  
  constructor(
    private _http: HttpClient
  ){

  }

  save(cobranza): Observable<any>{
    return this._http.post(GLOBAL.url+'cobranza', cobranza);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'cobranza');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'cobranza/' + id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'cobranza/' + id);
  }

  getCobranzasCliente(): Observable<any>{
    return this._http.get(GLOBAL.url+'clientecobranzas');
  }

}