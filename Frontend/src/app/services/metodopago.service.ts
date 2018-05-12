import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { MetodoPago } from "../models/MetodoPago";
import { GLOBAL } from "./global";

@Injectable()
export class MetodoPagoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<MetodoPago[]> {
        return this._http.get<MetodoPago[]>(GLOBAL.url+'metodopago');
    }

    public get(id: number): Observable<MetodoPago> {
        return this._http.get<MetodoPago>(GLOBAL.url+'metodopago/' + id);
    }

}