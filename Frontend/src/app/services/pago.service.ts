import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Pago } from "../models/Pago";
import { GLOBAL } from "./global";

@Injectable()
export class PagoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(pago: Pago): Observable<number> {
        return this._http.post<number>(GLOBAL.url+'pago', Pago.getJSON(pago));
    }

    public update(pago: Pago): Observable<any> {
        return this._http.put(GLOBAL.url+'pago/' + pago.id, Pago.getJSON(pago));
    }

    public query(): Observable<Pago[]> {
        return this._http.get<Pago[]>(GLOBAL.url+'pago');
    }

    public get(id: number): Observable<Pago> {
        return this._http.get<Pago>(GLOBAL.url+'pago/' + id);
    }

    public delete(pago: Pago): Observable<any> {
        return this._http.delete(GLOBAL.url+'pago/' + pago.id);
    }

}