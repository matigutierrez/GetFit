import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from "./global";
import { Profesor } from "../models/Profesor";

@Injectable({
    providedIn: 'root'
})
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
        return this._http.get<Profesor[]>(GLOBAL.url + 'profesor')
            .pipe(map(profesores => profesores.map(profesor => new Profesor(profesor))));
    }

    public get(id: number): Observable<Profesor> {
        return this._http.get<Profesor>(GLOBAL.url + 'profesor/' + id)
            .pipe(map(profesor => new Profesor(profesor)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'profesor/' + id);
    }

}