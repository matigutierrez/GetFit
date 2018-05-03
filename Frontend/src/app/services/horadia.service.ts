import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { HoraDia } from "../models/HoraDia";
import { HttpClient } from "@angular/common/http";
import { GLOBAL } from "./global";

@Injectable()
export class HoraDiaService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<HoraDia[]> {
        return this._http.get<HoraDia[]>(GLOBAL.url+"horadia");
    }

}