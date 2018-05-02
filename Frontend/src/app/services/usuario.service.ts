import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UsuarioService{
  
  constructor(
    private _http: HttpClient
  ){
    
  }

  save(usuario): Observable<any>{
    return this._http.post(GLOBAL.url+'usuario', usuario);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'usuario');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'usuario/'+id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'usuario/'+id);
  }
}