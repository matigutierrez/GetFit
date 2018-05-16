import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";
import { Horario } from "../models/Horario";

@Injectable()
export class HorarioService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(horario:Horario): Observable<number> {
        return this._http.post<number>(GLOBAL.url+'horario', Horario.getJSON(horario));
    }

    public update(horario:Horario): Observable<any> {
        return this._http.put(GLOBAL.url+'horario/' + horario.id, Horario.getJSON(horario));
    }

    public query(): Observable<Horario[]> {
        return this._http.get<Horario[]>(GLOBAL.url+'horario');
    }

    public get(id:number): Observable<Horario> {
        return this._http.get<Horario>(GLOBAL.url+'horario/' + id);
    }

    public delete(id:number): Observable<any> {
        return this._http.delete(GLOBAL.url+'horario/' + id);
    }

}