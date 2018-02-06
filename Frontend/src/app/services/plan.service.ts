import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class PlanService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(plan): Observable<any>{
    let params = JSON.stringify(plan);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'plan', params, {headers: headers});
  }

  getPlan(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'plan', {headers: headers});
  }

  getPlanId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'plan/'+params, {headers: headers});
  }

  deletePlanId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.delete(this.url+'plan/'+params, {headers: headers});
  }
}