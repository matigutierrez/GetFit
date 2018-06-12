import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { SolicitudGrupo } from "../models/SolicitudGrupo";
import { Grupo } from "../models/Grupo";

@Injectable({
    providedIn: 'root'
})
export class SolicitudGrupoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(solicitudGrupo: SolicitudGrupo): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'solicitudgrupo', SolicitudGrupo.getJSON(solicitudGrupo));
    }

    public update(solicitudGrupo: SolicitudGrupo): Observable<any> {
        return this._http.put(GLOBAL.url + 'solicitudgrupo/' + solicitudGrupo.id, SolicitudGrupo.getJSON(solicitudGrupo));
    }

    public query(): Observable<SolicitudGrupo[]> {
        return this._http.get<SolicitudGrupo[]>(GLOBAL.url + 'solicitudgrupo')
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudGrupo(solicitud))));
    }

    public get(id: number): Observable<SolicitudGrupo> {
        return this._http.get<SolicitudGrupo>(GLOBAL.url + 'solicitudgrupo/' + id)
            .pipe(map(solicitud => new SolicitudGrupo(solicitud)));
    }

    public findToken(grupo_id: number): Observable<SolicitudGrupo> {
        return this._http.get<SolicitudGrupo>(GLOBAL.url + "solicitudgrupo/findtoken/" + grupo_id)
            .pipe(map(solicitud => new SolicitudGrupo(solicitud)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'solicitudgrupo/' + id);
    }

    public solicitar(grupo_id: number): Observable<number> {
        return this._http.get<number>(GLOBAL.url + 'solicitudgrupo/solicitar/' + grupo_id);
    }

}