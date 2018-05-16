import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { DiaSemana } from "../models/DiaSemana";
import { GLOBAL } from "./global";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DiaSemanaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<DiaSemana[]> {
        return this._http.get<DiaSemana[]>(GLOBAL.url+"diasemana");
    }

}