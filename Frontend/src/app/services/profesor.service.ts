import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from "./global";
import { Profesor } from "../models/Profesor";

@Injectable()
export class ProfesorService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(profesor: Profesor): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'profesor', profesor);
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