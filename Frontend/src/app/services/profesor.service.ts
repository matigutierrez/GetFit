import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";
import { Profesor } from "../models/Profesor";

@Injectable()
export class ProfesorService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(profesor: Profesor): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'profesor', Profesor.getJSON(profesor));
    }

    public update(profesor: Profesor): Observable<any> {
        return this._http.put(GLOBAL.url + 'profesor/' + profesor.id, Profesor.getJSON(profesor));
    }

    public query(): Observable<Profesor[]> {
        return this._http.get<Profesor[]>(GLOBAL.url + 'profesor');
    }

    public get(id: number): Observable<Profesor> {
        return this._http.get<Profesor>(GLOBAL.url + 'profesor/' + id);
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'profesor/' + id);
    }

}