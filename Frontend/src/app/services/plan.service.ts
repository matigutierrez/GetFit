import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { UserService } from './user.service';
import { Plan } from '../models/plan';

@Injectable()
export class PlanService{
  
  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    
  }

  save(plan:Plan): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'plan', plan);
  }

  query(): Observable<Plan[]>{
    return this._http.get<Plan[]>(GLOBAL.url+'plan');
  }

  get(id:number): Observable<Plan>{
    return this._http.get<Plan>(GLOBAL.url+'plan/'+id);
  }

  delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'plan/'+id);
  }
}