import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Cobranza } from '../models/Cobranza';

@Injectable({
    providedIn: 'root'
})
export class CobranzaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public update(cobranza: Cobranza): Observable<any> {
        return this._http.put(GLOBAL.url + 'cobranza/' + cobranza.id, Cobranza.getJSON(cobranza));
    }

    public query(): Observable<Cobranza[]> {
        return this._http.get<Cobranza[]>(GLOBAL.url + 'cobranza')
            .pipe(map(cobranzas => cobranzas.map(cobranza => new Cobranza(cobranza))));
    }

    public get(id: number): Observable<Cobranza> {
        return this._http.get<Cobranza>(GLOBAL.url + 'cobranza/' + id)
            .pipe(map(cobranza => new Cobranza(cobranza)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'cobranza/' + id);
    }

    public getCobranzasCliente(): Observable<Cobranza[]> {
        return this._http.get<Cobranza[]>(GLOBAL.url + 'cobranzastoken')
            .pipe(map(cobranzas => cobranzas.map(cobranza => new Cobranza(cobranza))));
    }

}