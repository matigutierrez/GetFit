import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class SedeService{
  
  constructor(
    private _http: HttpClient
  ){
    
  }

  save(sede): Observable<any>{
    return this._http.post(GLOBAL.url+'sede', sede);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'sede');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'sede/'+id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'sede/'+id);
  }
}