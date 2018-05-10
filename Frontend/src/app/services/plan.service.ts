import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Plan } from '../models/Plan';
import { Cliente } from '../models/Cliente';

@Injectable()
export class PlanService {
  
  constructor(
    private _http: HttpClient
  ){
    
  }

  public save(plan:Plan): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'plan', plan);
  }

  public query(): Observable<Plan[]>{
    return this._http.get<Plan[]>(GLOBAL.url+'plan');
  }

  public get(id:number): Observable<Plan>{
    return this._http.get<Plan>(GLOBAL.url+'plan/'+id);
  }

  public delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'plan/'+id);
  }

  public getPlanesContratados(): Observable<Plan[]> {
    return this._http.get<Plan[]>(GLOBAL.url+'clienteplanes');
  }

  public getPlanesNoContratados(): Observable<Plan[]> {
    return this._http.get<Plan[]>(GLOBAL.url+'clientenoplanes');
  }

  public clientesSolicitando(plan:Plan): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url+'plan/' + plan.id + '/clientessolicitando');
  }

  public clientesSolicitandoByID(id:number): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(GLOBAL.url+'plan/' + id + '/clientessolicitando');
  }
  
}