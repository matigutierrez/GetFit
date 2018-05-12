import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Contrato } from "../models/Contrato";
import { GLOBAL } from "./global";

@Injectable()
export class ContratoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(contrato:Contrato, acta:File): Observable<HttpEvent<number>> {

        let formulario: FormData = new FormData();

        formulario.append('contrato', new Blob([JSON.stringify(Contrato.getJSON(contrato))], {type: 'application/json'}) );
        formulario.append('acta', acta);

        let req = new HttpRequest('POST', GLOBAL.url+"contrato", formulario, {reportProgress: true});

        return this._http.request<number>(req);
    }

    public update(contrato:Contrato): Observable<number> {
        return this._http.put<number>(GLOBAL.url+"contrato", Contrato.getJSON(contrato));
    }

    public query(): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url+"contrato");
    }

    public get(id:number): Observable<Contrato> {
        return this._http.get<Contrato>(GLOBAL.url+"contrato/" + id);
    }

    public delete(id:number): Observable<any> {
        return this._http.delete(GLOBAL.url+"contrato/" + id);
    }

    public getActa(id:number): Observable<HttpEvent<Blob>> {

        let req = new HttpRequest(
            'GET',
            GLOBAL.url+"contrato/" + id + "/acta",
            {
                responseType: 'blob',
                reportProgress: true
            }
        );

        return this._http.request<Blob>(req);
    }

}