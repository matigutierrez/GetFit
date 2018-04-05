import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class PlanService{
  
  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    
  }

  save(plan): Observable<any>{
    return this._http.post(GLOBAL.url+'plan', plan);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'plan');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'plan/'+id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'plan/'+id);
  }
}