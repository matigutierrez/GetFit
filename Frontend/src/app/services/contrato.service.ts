import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { Contrato } from "../models/Contrato";
import { GLOBAL } from "./global";

@Injectable()
export class ContratoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(contrato:Contrato, acta:File): Observable<number> {

        let formulario: FormData = new FormData();

        formulario.append('contrato', new Blob([JSON.stringify(contrato)], {type: 'application/json'}) );
        formulario.append('acta', acta);

        return this._http.post<number>(GLOBAL.url+"contrato", formulario);
    }

    public update(contrato:Contrato): Observable<number> {
        return this._http.put<number>(GLOBAL.url+"contrato", contrato);
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

    public getActa(id:number): Observable<Blob> {
        return this._http.get(GLOBAL.url+"contrato/" + id + "/acta", {responseType: 'blob'});
    }

}