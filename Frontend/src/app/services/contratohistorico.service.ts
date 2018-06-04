import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ContratoHistorico } from "../models/ContratoHistorico";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class ContratoHistoricoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(contrato: ContratoHistorico, acta: File): Observable<HttpEvent<number>> {

        let formulario: FormData = new FormData();

        formulario.append('contrato', new Blob([JSON.stringify(ContratoHistorico.getJSON(contrato))], { type: 'application/json' }));
        formulario.append('acta', acta);

        let req = new HttpRequest('POST', GLOBAL.url + "contrato", formulario, { reportProgress: true });

        return this._http.request<number>(req);
    }

}