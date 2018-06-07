import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { SolicitudPlan } from "../models/SolicitudPlan";
import { Plan } from "../models/Plan";

@Injectable({
    providedIn: 'root'
})
export class SolicitudPlanService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(solicitudPlan: SolicitudPlan): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'solicitudplan', SolicitudPlan.getJSON(solicitudPlan));
    }

    public update(solicitudPlan: SolicitudPlan): Observable<any> {
        return this._http.put(GLOBAL.url + 'solicitudplan/' + solicitudPlan.id, SolicitudPlan.getJSON(solicitudPlan));
    }

    public query(): Observable<SolicitudPlan[]> {
        return this._http.get<SolicitudPlan[]>(GLOBAL.url + 'solicitudplan')
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudPlan(solicitud))));
    }

    public get(id: number): Observable<SolicitudPlan> {
        return this._http.get<SolicitudPlan>(GLOBAL.url + 'solicitudplan/' + id)
            .pipe(map(solicitud => new SolicitudPlan(solicitud)));
    }

    public findToken(plan_id: number): Observable<SolicitudPlan> {
        return this._http.get<SolicitudPlan>(GLOBAL.url + "solicitudplan/findtoken/" + plan_id)
            .pipe(map(solicitud => new SolicitudPlan(solicitud)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'solicitudplan/' + id);
    }

    public solicitar(plan_id: number): Observable<number> {
        return this._http.get<number>(GLOBAL.url + 'solicitudplan/solicitar/' + plan_id);
    }

}