import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { CobranzaHistorica } from '../models/CobranzaHistorica';

@Injectable({
    providedIn: 'root'
})
export class CobranzaHistoricaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(cobranza: CobranzaHistorica): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'cobranzahistorica', CobranzaHistorica.getJSON(cobranza));
    }

}