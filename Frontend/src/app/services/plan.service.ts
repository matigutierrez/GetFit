import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Plan } from '../models/Plan';
import { Cliente } from '../models/Cliente';
import { Profesor } from '../models/Profesor';
import { Horario } from '../models/Horario';
import { Contrato } from '../models/Contrato';
import { SolicitudPlan } from '../models/SolicitudPlan';

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
    return this._http.get<Plan[]>(GLOBAL.url + 'plan');
  }

  public get(id: number): Observable<Plan> {
    return this._http.get<Plan>(GLOBAL.url + 'plan/' + id);
  }

  public delete(id: number): Observable<any> {
    return this._http.delete(GLOBAL.url + 'plan/' + id);
  }

  public getContratos(plan: Plan): Observable<Contrato[]> {
    return this._http.get<Contrato[]>(GLOBAL.url + 'plan/' + plan.id + '/contratos');
  }

  public getContratosToken(): Observable<Contrato[]> {
    return this._http.get<Contrato[]>(GLOBAL.url + 'clientecontratos');
  }

  public getSolicitudes(plan: Plan): Observable<SolicitudPlan[]> {
    return this._http.get<SolicitudPlan[]>(GLOBAL.url + 'plan/' + plan.id + '/solicitudes');
  }

  public getPlanesNoContratados(): Observable<Plan[]> {
    return this._http.get<Plan[]>(GLOBAL.url + 'clientenoplanes');
  }

  public getClientes(plan: Plan): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + plan.id + '/clientes');
  }

  public clientesSolicitando(plan: Plan): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + plan.id + '/clientessolicitando');
  }

  public clientesSolicitandoByID(id: number): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url + 'plan/' + id + '/clientessolicitando');
  }

  public getProfesores(plan: Plan): Observable<Profesor[]> {
    return this._http.get<Profesor[]>(GLOBAL.url + 'plan/' + plan.id + '/profesores');
  }

  public getProfesoresByID(id: number): Observable<Profesor[]> {
    return this._http.get<Profesor[]>(GLOBAL.url + 'plan/' + id + '/profesores');
  }

  public getHorarios(plan: Plan): Observable<Horario[]> {
    return this._http.get<Horario[]>(GLOBAL.url + 'plan/' + plan.id + '/horarios');
  }

}