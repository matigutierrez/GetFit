import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetodoPago } from "../models/MetodoPago";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class MetodoPagoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<MetodoPago[]> {
        return this._http.get<MetodoPago[]>(GLOBAL.url + 'metodopago')
            .pipe(map(metodos => metodos.map(metodo => new MetodoPago(metodo))));
    }

    public get(id: number): Observable<MetodoPago> {
        return this._http.get<MetodoPago>(GLOBAL.url + 'metodopago/' + id)
            .pipe(map(metodo => new MetodoPago(metodo)));
    }

}