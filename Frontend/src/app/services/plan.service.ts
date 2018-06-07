import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Plan } from '../models/Plan';
import { Cliente } from '../models/Cliente';
import { Profesor } from '../models/Profesor';
import { Horario } from '../models/Horario';
import { Contrato } from '../models/Contrato';
import { SolicitudPlan } from '../models/SolicitudPlan';
import { Cobranza } from '../models/Cobranza';
import { ContratoHistorico } from '../models/ContratoHistorico';

@Injectable({
    providedIn: 'root'
})
export class PlanService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(plan: Plan): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'plan', Plan.getJSON(plan));
    }

    public update(plan: Plan): Observable<any> {
        return this._http.put(GLOBAL.url + 'plan/' + plan.id, Plan.getJSON(plan));
    }

    public query(): Observable<Plan[]> {
        return this._http.get<Plan[]>(GLOBAL.url + 'plan')
            .pipe(map(planes => planes.map(plan => new Plan(plan))));
    }

    public get(id: number): Observable<Plan> {
        return this._http.get<Plan>(GLOBAL.url + 'plan/' + id)
            .pipe(map(plan => new Plan(plan)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'plan/' + id);
    }

    public getContratos(plan: Plan): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'plan/' + plan.id + '/contratos')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getContratosHistoricos(plan: Plan): Observable<ContratoHistorico[]> {
        return this._http.get<ContratoHistorico[]>(GLOBAL.url + 'plan/' + plan.id + '/contratoshistoricos')
            .pipe(map(contratosHistoricos => contratosHistoricos.map(contratoHistorico => new ContratoHistorico(contratoHistorico))));
    }

    public getContratosCobranzas(plan: Plan): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'plan/' + plan.id + '/contratoscobranzas')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getContratosCobranzasHistoricas(plan: Plan): Observable<ContratoHistorico[]> {
        return this._http.get<ContratoHistorico[]>(GLOBAL.url + 'plan/' + plan.id + '/contratoscobranzashistoricas')
            .pipe(map(contratosHistoricos => contratosHistoricos.map(contratoHistorico => new ContratoHistorico(contratoHistorico))));
    }

    public getContratosToken(): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'clientecontratos')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getSolicitudes(plan: Plan): Observable<SolicitudPlan[]> {
        return this._http.get<SolicitudPlan[]>(GLOBAL.url + 'plan/' + plan.id + '/solicitudes')
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudPlan(solicitud))));
    }

    public getClientes(plan: Plan): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + plan.id + '/clientes')
            .pipe(map(clientes => clientes.map(cliente => new Cliente(cliente))));
    }

    public clientesSolicitando(plan: Plan): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + plan.id + '/clientessolicitando')
            .pipe(map(clientes => clientes.map(cliente => new Cliente(cliente))));
    }

    public clientesSolicitandoByID(id: number): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + id + '/clientessolicitando')
            .pipe(map(clientes => clientes.map(cliente => new Cliente(cliente))));
    }

    public getProfesores(plan: Plan): Observable<Profesor[]> {
        return this._http.get<Profesor[]>(GLOBAL.url + 'plan/' + plan.id + '/profesores')
            .pipe(map(profesores => profesores.map(profesor => new Profesor(profesor))));
    }

    public getProfesoresByID(id: number): Observable<Profesor[]> {
        return this._http.get<Profesor[]>(GLOBAL.url + 'plan/' + id + '/profesores')
            .pipe(map(profesores => profesores.map(profesor => new Profesor(profesor))));
    }

    public getHorarios(plan: Plan): Observable<Horario[]> {
        return this._http.get<Horario[]>(GLOBAL.url + 'plan/' + plan.id + '/horarios')
            .pipe(map(horarios => horarios.map(horario => new Horario(horario))));
    }

}