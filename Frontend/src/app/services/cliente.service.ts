import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Cliente } from '../models/Cliente';
import { Plan } from '../models/Plan';

@Injectable()
export class ClienteService {

  public constructor(
    private _http: HttpClient
  ) {

  }

  public save(cliente: Cliente): Observable<number> {
    return this._http.post<number>(GLOBAL.url + 'cliente', cliente);
  }

  public query(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url + 'cliente');
  }

  public get(id: number): Observable<Cliente> {
    return this._http.get<Cliente>(GLOBAL.url + 'cliente/' + id);
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(GLOBAL.url + 'cliente/' + id);
  }

  public planesSolicitados(cliente:Cliente): Observable<Plan[]> {
    return this._http.get<Plan[]>(GLOBAL.url+'cliente/' + cliente.id + '/planessolicitados');
  }

  public planesSolicitadosByID(id:number): Observable<Plan[]> {
    return this._http.get<Plan[]>(GLOBAL.url+'cliente/' + id + '/planessolicitados');
  }

}