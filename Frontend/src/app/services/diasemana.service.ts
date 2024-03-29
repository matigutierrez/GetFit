import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiaSemana } from "../models/DiaSemana";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class DiaSemanaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<DiaSemana[]> {
        return this._http.get<DiaSemana[]>(GLOBAL.url + "diasemana")
            .pipe(map(dias => dias.map(dia => new DiaSemana(dia))));
    }

}