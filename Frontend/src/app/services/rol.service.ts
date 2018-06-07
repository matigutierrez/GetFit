import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Rol } from "../models/Rol";

@Injectable({
    providedIn: 'root'
})
export class RolService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(rol: Rol): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'rol', rol);
    }

    public query(): Observable<Rol[]> {
        return this._http.get<Rol[]>(GLOBAL.url + 'rol')
            .pipe(map(roles => roles.map(rol => new Rol(rol))));
    }

    public getRolSesion(): Observable<Rol> {
        return this._http.get<Rol>(GLOBAL.url + 'usuariorol')
            .pipe(map(rol => new Rol(rol)));
    }

    public get(id: number): Observable<Rol> {
        return this._http.get<Rol>(GLOBAL.url + 'rol/' + id)
            .pipe(map(rol => new Rol(rol)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'rol/' + id);
    }
}