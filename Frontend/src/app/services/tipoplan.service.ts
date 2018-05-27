import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { TipoPlan } from "../models/TipoPlan";

@Injectable({
    providedIn: 'root'
})
export class TipoPlanService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<TipoPlan[]> {
        return this._http.get<TipoPlan[]>(GLOBAL.url + 'tipoplan');
    }

}