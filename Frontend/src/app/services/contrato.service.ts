import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contrato } from "../models/Contrato";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class ContratoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public update(contrato: Contrato): Observable<number> {
        return this._http.put<number>(GLOBAL.url + "contrato", Contrato.getJSON(contrato));
    }

    public query(): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + "contrato")
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public get(id: number): Observable<Contrato> {
        return this._http.get<Contrato>(GLOBAL.url + "contrato/" + id)
            .pipe(map(contrato => new Contrato(contrato)));
    }

    public find(cliente_id: number, grupo_id: number): Observable<Contrato> {
        return this._http.get<Contrato>(GLOBAL.url + "contrato/find/" + cliente_id + "/" + grupo_id)
            .pipe(map(contrato => new Contrato(contrato)));
    }

    public findToken(grupo_id: number): Observable<Contrato> {
        return this._http.get<Contrato>(GLOBAL.url + "contrato/findtoken/" + grupo_id)
            .pipe(map(contrato => new Contrato(contrato)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + "contrato/" + id);
    }

    public getActa(id: number): Observable<HttpEvent<Blob>> {

        let req = new HttpRequest(
            'GET',
            GLOBAL.url + "contrato/" + id + "/acta",
            {
                responseType: 'blob',
                reportProgress: true
            }
        );

        return this._http.request<Blob>(req);
    }

}