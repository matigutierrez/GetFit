import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Notificacion } from "../models/Notificacion";

@Injectable()
export class NotificacionService{
  
  constructor(
    private _http: HttpClient
  ){
    
  }

  save(notificacion:Notificacion): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'notificacion', notificacion);
  }

  query(): Observable<Notificacion[]>{
    return this._http.get<Notificacion[]>(GLOBAL.url+'notificacion');
  }

  get(id:number): Observable<Notificacion>{
    return this._http.get<Notificacion>(GLOBAL.url+'notificacion/'+id);
  }

  delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'notificacion/'+id);
  }
}