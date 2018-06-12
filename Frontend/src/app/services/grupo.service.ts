import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Grupo } from '../models/Grupo';
import { Cliente } from '../models/Cliente';
import { Profesor } from '../models/Profesor';
import { Horario } from '../models/Horario';
import { Contrato } from '../models/Contrato';
import { SolicitudGrupo } from '../models/SolicitudGrupo';
import { Cobranza } from '../models/Cobranza';
import { ContratoHistorico } from '../models/ContratoHistorico';

@Injectable({
    providedIn: 'root'
})
export class GrupoService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(grupo: Grupo): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'grupo', Grupo.getJSON(grupo));
    }

    public update(grupo: Grupo): Observable<any> {
        return this._http.put(GLOBAL.url + 'grupo/' + grupo.id, Grupo.getJSON(grupo));
    }

    public query(): Observable<Grupo[]> {
        return this._http.get<Grupo[]>(GLOBAL.url + 'grupo')
            .pipe(map(grupos => grupos.map(grupo => new Grupo(grupo))));
    }

    public get(id: number): Observable<Grupo> {
        return this._http.get<Grupo>(GLOBAL.url + 'grupo/' + id)
            .pipe(map(grupo => new Grupo(grupo)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'grupo/' + id);
    }

    public getContratos(grupo: Grupo): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'grupo/' + grupo.id + '/contratos')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getContratosHistoricos(grupo: Grupo): Observable<ContratoHistorico[]> {
        return this._http.get<ContratoHistorico[]>(GLOBAL.url + 'grupo/' + grupo.id + '/contratoshistoricos')
            .pipe(map(contratosHistoricos => contratosHistoricos.map(contratoHistorico => new ContratoHistorico(contratoHistorico))));
    }

    public getContratosCobranzas(grupo: Grupo): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'grupo/' + grupo.id + '/contratoscobranzas')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getContratosCobranzasHistoricas(grupo: Grupo): Observable<ContratoHistorico[]> {
        return this._http.get<ContratoHistorico[]>(GLOBAL.url + 'grupo/' + grupo.id + '/contratoscobranzashistoricas')
            .pipe(map(contratosHistoricos => contratosHistoricos.map(contratoHistorico => new ContratoHistorico(contratoHistorico))));
    }

    public getContratosToken(): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'clientecontratos')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getSolicitudes(grupo: Grupo): Observable<SolicitudGrupo[]> {
        return this._http.get<SolicitudGrupo[]>(GLOBAL.url + 'grupo/' + grupo.id + '/solicitudes')
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudGrupo(solicitud))));
    }

    public getClientes(grupo: Grupo): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(GLOBAL.url + 'grupo/' + grupo.id + '/clientes')
            .pipe(map(clientes => clientes.map(cliente => new Cliente(cliente))));
    }

    public getProfesores(grupo: Grupo): Observable<Profesor[]> {
        return this._http.get<Profesor[]>(GLOBAL.url + 'grupo/' + grupo.id + '/profesores')
            .pipe(map(profesores => profesores.map(profesor => new Profesor(profesor))));
    }

    public getProfesoresByID(id: number): Observable<Profesor[]> {
        return this._http.get<Profesor[]>(GLOBAL.url + 'grupo/' + id + '/profesores')
            .pipe(map(profesores => profesores.map(profesor => new Profesor(profesor))));
    }

    public getHorarios(grupo: Grupo): Observable<Horario[]> {
        return this._http.get<Horario[]>(GLOBAL.url + 'grupo/' + grupo.id + '/horarios')
            .pipe(map(horarios => horarios.map(horario => new Horario(horario))));
    }

}