import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./global";
import { DisponibilidadHistoricaServicio } from "../models/DisponibilidadHistoricaServicio";
import { SolicitudServicioHistorica } from "../models/SolicitudServicioHistorica";
import { SolicitudServicio } from "../models/SolicitudServicio";

@Injectable({
    providedIn: 'root'
})
export class DisponibilidadHistoricaServicioService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio): Observable<number> {
        return this._http.post<number>(GLOBAL.url + "disponibilidadhistoricaservicio", DisponibilidadHistoricaServicio.getJSON(disponibilidadHistoricaServicio));
    }

    public update(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio): Observable<any> {
        return this._http.put(GLOBAL.url + "disponibilidadhistoricaservicio/" + disponibilidadHistoricaServicio.id, DisponibilidadHistoricaServicio.getJSON(disponibilidadHistoricaServicio));
    }

    public query(): Observable<DisponibilidadHistoricaServicio[]> {
        return this._http.get<DisponibilidadHistoricaServicio[]>(GLOBAL.url + "disponibilidadhistoricaservicio")
            .pipe(map(disponibilidades => disponibilidades.map(disponibilidad => new DisponibilidadHistoricaServicio(disponibilidad))));
    }

    public get(id: number): Observable<DisponibilidadHistoricaServicio> {
        return this._http.get<DisponibilidadHistoricaServicio>(GLOBAL.url + "disponibilidadhistoricaservicio/" + id)
            .pipe(map(disponibilidad => new DisponibilidadHistoricaServicio(disponibilidad)));
    }

    public getSolicitudesHistoricas(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio): Observable<SolicitudServicioHistorica[]> {
        return this._http.get<SolicitudServicioHistorica[]>(GLOBAL.url + "disponibilidadhistoricaservicio/" + disponibilidadHistoricaServicio.id + "/solicitudeshistoricas")
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudServicioHistorica(solicitud))));
    }

    public getSolicitudes(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio): Observable<SolicitudServicio[]> {
        return this._http.get<SolicitudServicio[]>(GLOBAL.url + "disponibilidadhistoricaservicio/" + disponibilidadHistoricaServicio.id + "/solicitudes")
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudServicio(solicitud))));
    }

}