import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Sede } from "../models/Sede";

@Injectable()
export class SedeService{
  
  constructor(
    private _http: HttpClient
  ){
    
  }

  save(sede:Sede): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'sede', sede);
  }

  query(): Observable<Sede[]>{
    return this._http.get<Sede[]>(GLOBAL.url+'sede');
  }

  get(id:number): Observable<Sede>{
    return this._http.get<Sede>(GLOBAL.url+'sede/'+id);
  }

  delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'sede/'+id);
  }
}