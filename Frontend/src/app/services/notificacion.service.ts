import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Notificacion } from "../models/Notificacion";

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(notificacion: Notificacion): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'notificacion', Notificacion.getJSON(notificacion));
    }

    public update(notificacion: Notificacion): Observable<any> {
        return this._http.put(GLOBAL.url + 'notificacion/' + notificacion.id, Notificacion.getJSON(notificacion));
    }

    public query(): Observable<Notificacion[]> {
        return this._http.get<Notificacion[]>(GLOBAL.url + 'notificacion')
            .pipe(map(notificaciones => notificaciones.map(notificacion => new Notificacion(notificacion))));
    }

    public get(id: number): Observable<Notificacion> {
        return this._http.get<Notificacion>(GLOBAL.url + 'notificacion/' + id)
            .pipe(map(notificacion => new Notificacion(notificacion)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'notificacion/' + id);
    }
}