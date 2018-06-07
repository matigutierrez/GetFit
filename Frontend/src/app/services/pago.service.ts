import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pago } from "../models/Pago";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class PagoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(pago: Pago): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'pago', Pago.getJSON(pago));
    }

    public update(pago: Pago): Observable<any> {
        return this._http.put(GLOBAL.url + 'pago/' + pago.id, Pago.getJSON(pago));
    }

    public query(): Observable<Pago[]> {
        return this._http.get<Pago[]>(GLOBAL.url + 'pago')
            .pipe(map(pagos => pagos.map(pago => new Pago(pago))));
    }

    public get(id: number): Observable<Pago> {
        return this._http.get<Pago>(GLOBAL.url + 'pago/' + id)
            .pipe(map(pago => new Pago(pago)));
    }

    public delete(pago: Pago): Observable<any> {
        return this._http.delete(GLOBAL.url + 'pago/' + pago.id);
    }

}