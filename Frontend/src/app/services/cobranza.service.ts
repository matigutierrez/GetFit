import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';
import { Cobranza } from '../models/Cobranza';

@Injectable()
export class CobranzaService{
  
  constructor(
    private _http: HttpClient
  ){

  }

  save(cobranza:Cobranza): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'cobranza', cobranza);
  }

  query(): Observable<Cobranza[]>{
    return this._http.get<Cobranza[]>(GLOBAL.url+'cobranza');
  }

  get(id:number): Observable<Cobranza>{
    return this._http.get<Cobranza>(GLOBAL.url+'cobranza/' + id);
  }

  delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'cobranza/' + id);
  }

  getCobranzasCliente(): Observable<Cobranza[]>{
    return this._http.get<Cobranza[]>(GLOBAL.url+'clientecobranzas');
  }

}