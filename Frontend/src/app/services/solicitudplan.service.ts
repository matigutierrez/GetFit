import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { SolicitudPlan } from "../models/SolicitudPlan";

@Injectable({
    providedIn: 'root'
})
export class SolicitudPlanService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(solicitudPlan: SolicitudPlan): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'solicitudplan', solicitudPlan);
    }

    public update(solicitudPlan: SolicitudPlan): Observable<any> {
        return this._http.put(GLOBAL.url + 'solicitudplan/' + solicitudPlan.id, solicitudPlan);
    }

    public query(): Observable<SolicitudPlan[]> {
        return this._http.get<SolicitudPlan[]>(GLOBAL.url + 'solicitudplan');
    }

    public get(id: number): Observable<SolicitudPlan> {
        return this._http.get<SolicitudPlan>(GLOBAL.url + 'solicitudplan/' + id);
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'solicitudplan/' + id);
    }
}