import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class PlanService{
  public url: string;

  constructor(
    private _http: Http,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(plan){
    let params = JSON.stringify(plan);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.post(this.url+'plan', params, {headers: headers}).map(res => res.json());
  }

  getPlan(){
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.get(this.url+'plan', {headers: headers}).map(res => res.json());
  }

  getPlanId(id){
    let params = JSON.stringify(id);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.get(this.url+'plan/'+params, {headers: headers}).map(res => res.json());;
  }

  deletePlanId(id){
    let params = JSON.stringify(id);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.delete(this.url+'plan/'+params, {headers: headers}).map(res => res.json());;
  }
}