import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { TipoGrupo } from "../models/TipoGrupo";

@Injectable({
    providedIn: 'root'
})
export class TipoGrupoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public query(): Observable<TipoGrupo[]> {
        return this._http.get<TipoGrupo[]>(GLOBAL.url + 'tipogrupo')
            .pipe(map(tipos => tipos.map(tipo => new TipoGrupo(tipo))));
    }

}