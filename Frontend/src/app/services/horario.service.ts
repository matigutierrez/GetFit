import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./global";
import { Horario } from "../models/Horario";

@Injectable({
    providedIn: 'root'
})
export class HorarioService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(horario: Horario): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'horario', Horario.getJSON(horario));
    }

    public update(horario: Horario): Observable<any> {
        return this._http.put(GLOBAL.url + 'horario/' + horario.id, Horario.getJSON(horario));
    }

    public query(): Observable<Horario[]> {
        return this._http.get<Horario[]>(GLOBAL.url + 'horario')
            .pipe(map(horarios => horarios.map(horario => new Horario(horario))));
    }

    public get(id: number): Observable<Horario> {
        return this._http.get<Horario>(GLOBAL.url + 'horario/' + id)
            .pipe(map(horario => new Horario(horario)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'horario/' + id);
    }

}