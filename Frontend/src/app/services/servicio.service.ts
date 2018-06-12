import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Servicio } from "../models/Servicio";

@Injectable({
    providedIn: 'root'
})
export class ServicioService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(servicio: Servicio): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'servicio', Servicio.getJSON(servicio));
    }

    public update(servicio: Servicio): Observable<any> {
        return this._http.put(GLOBAL.url + 'servicio/' + servicio.id, Servicio.getJSON(servicio));
    }

    public query(): Observable<Servicio[]> {
        return this._http.get<Servicio[]>(GLOBAL.url + 'servicio')
            .pipe(map(servicios => servicios.map(servicio => new Servicio(servicio))));
    }

    public get(id: number): Observable<Servicio> {
        return this._http.get<Servicio>(GLOBAL.url + 'servicio/' + id)
            .pipe(map(servicio => new Servicio(servicio)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'servicio/' + id);
    }

}