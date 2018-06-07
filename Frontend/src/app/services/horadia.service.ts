import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HoraDia } from "../models/HoraDia";
import { HttpClient } from "@angular/common/http";
import { GLOBAL } from "./global";

@Injectable({
    providedIn: 'root'
})
export class HoraDiaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<HoraDia[]> {
        return this._http.get<HoraDia[]>(GLOBAL.url + "horadia")
            .pipe(map(horas => horas.map(hora => new HoraDia(hora))));
    }

}