import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public constructor(
    private _http: HttpClient
  ) {

  }

  public save(usuario: Usuario): Observable<any> {
    return this._http.post(GLOBAL.url + 'usuario', Usuario.getJSON(usuario));
  }

  public update(usuario: Usuario): Observable<any> {
    return this._http.put(GLOBAL.url + 'usuario/' + usuario.id, Usuario.getJSON(usuario));
  }

  public query(): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(GLOBAL.url + 'usuario');
  }

  public get(id): Observable<Usuario> {
    return this._http.get<Usuario>(GLOBAL.url + 'usuario/' + id);
  }

  public delete(id): Observable<any> {
    return this._http.delete(GLOBAL.url + 'usuario/' + id);
  }
}