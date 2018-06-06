import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Sede } from "../models/Sede";

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  public constructor(
    private _http: HttpClient
  ) {

  }

  public save(sede: Sede): Observable<number> {
    return this._http.post<number>(GLOBAL.url + 'sede', Sede.getJSON(sede));
  }

  public update(sede: Sede): Observable<any> {
    return this._http.put(GLOBAL.url + 'sede/' + sede.id, Sede.getJSON(sede));
  }

  public query(): Observable<Sede[]> {
    return this._http.get<Sede[]>(GLOBAL.url + 'sede')
      .pipe( map( sedes => sedes.map(sede => new Sede(sede))) );
  }

  public get(id: number): Observable<Sede> {
    return this._http.get<Sede>(GLOBAL.url + 'sede/' + id)
      .pipe( map(sede => new Sede(sede)) );
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(GLOBAL.url + 'sede/' + id);
  }
}