import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class SedeService{
  public url: string;

  constructor(
    private _http: Http,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(sede){
    let params = JSON.stringify(sede);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.post(this.url+'sede', params, {headers: headers}).map(res => res.json());
  }

  getSede(){
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.get(this.url+'sede', {headers: headers}).map(res => res.json());
  }

  getSedeId(id){
    let params = JSON.stringify(id);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.get(this.url+'sede/'+params, {headers: headers}).map(res => res.json());;
  }

  deleteSedeId(id){
    let params = JSON.stringify(id);
    let headers = new Headers({'Authorization': this._userService.getToken()});

    return this._http.delete(this.url+'sede/'+params, {headers: headers}).map(res => res.json());;
  }
}