import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Rol } from "../models/Rol";

@Injectable()
export class RolService{
  
  public constructor(
    private _http: HttpClient
  ){
    
  }

  public save(rol:Rol): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'rol', rol);
  }

  public query(): Observable<Rol[]>{
    return this._http.get<Rol[]>(GLOBAL.url+'rol');
  }

  public getRolSesion(): Observable<Rol>{
    return this._http.get<Rol>(GLOBAL.url+'usuariorol');
  }

  public get(id:number): Observable<Rol>{
    return this._http.get<Rol>(GLOBAL.url+'rol/'+id);
  }

  public delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'rol/'+id);
  }
}