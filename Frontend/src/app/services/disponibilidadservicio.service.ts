import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./global";
import { DisponibilidadServicio } from "../models/DisponibilidadServicio";
import { SolicitudServicioHistorica } from "../models/SolicitudServicioHistorica";
import { SolicitudServicio } from "../models/SolicitudServicio";

@Injectable({
    providedIn: 'root'
})
export class DisponibilidadServicioService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(disponibilidadServicio: DisponibilidadServicio): Observable<number> {
        return this._http.post<number>(GLOBAL.url + "disponibilidadservicio", DisponibilidadServicio.getJSON(disponibilidadServicio));
    }

    public update(disponibilidadServicio: DisponibilidadServicio): Observable<any> {
        return this._http.put(GLOBAL.url + "disponibilidadservicio/" + disponibilidadServicio.id, DisponibilidadServicio.getJSON(disponibilidadServicio));
    }

    public query(): Observable<DisponibilidadServicio[]> {
        return this._http.get<DisponibilidadServicio[]>(GLOBAL.url + "disponibilidadservicio")
            .pipe(map(disponibilidades => disponibilidades.map(disponibilidad => new DisponibilidadServicio(disponibilidad))));
    }

    public get(id: number): Observable<DisponibilidadServicio> {
        return this._http.get<DisponibilidadServicio>(GLOBAL.url + "disponibilidadservicio/" + id)
            .pipe(map(disponibilidad => new DisponibilidadServicio(disponibilidad)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + "disponibilidadservicio/" + id);
    }

    public getSolicitudesHistoricas(disponibilidadServicio: DisponibilidadServicio): Observable<SolicitudServicioHistorica[]> {
        return this._http.get<SolicitudServicioHistorica[]>(GLOBAL.url + "disponibilidadservicio/" + disponibilidadServicio.id + "/solicitudeshistoricas")
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudServicioHistorica(solicitud))));
    }

    public getSolicitudes(disponibilidadServicio: DisponibilidadServicio): Observable<SolicitudServicio[]> {
        return this._http.get<SolicitudServicio[]>(GLOBAL.url + "disponibilidadservicio/" + disponibilidadServicio.id + "/solicitudes")
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudServicio(solicitud))));
    }

}