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

    public save(contrato:Contrato): Observable<number> {
        return this._http.post<number>(GLOBAL.url+"contrato", contrato);
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

}