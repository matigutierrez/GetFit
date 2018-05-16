import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Cobranza } from '../models/Cobranza';

@Injectable()
export class CobranzaService{
  
  public constructor(
    private _http: HttpClient
  ){

  }

  public save(cobranza: Cobranza): Observable<number> {
    return this._http.post<number>(GLOBAL.url+'cobranza', Cobranza.getJSON(cobranza));
  }

  public update(cobranza: Cobranza): Observable<any> {
    return this._http.put(GLOBAL.url+'cobranza/' + cobranza.id, Cobranza.getJSON(cobranza));
  }

  public query(): Observable<Cobranza[]>{
    return this._http.get<Cobranza[]>(GLOBAL.url+'cobranza');
  }

  public get(id:number): Observable<Cobranza>{
    return this._http.get<Cobranza>(GLOBAL.url+'cobranza/' + id);
  }

  public delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'cobranza/' + id);
  }

  public getCobranzasCliente(): Observable<Cobranza[]>{
    return this._http.get<Cobranza[]>(GLOBAL.url+'clientecobranzas');
  }

}