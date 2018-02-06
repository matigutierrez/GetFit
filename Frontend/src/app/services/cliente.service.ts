import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class ClienteService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(cliente): Observable<any>{
    let params = JSON.stringify(cliente);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'cliente', params, {headers: headers});
  }

  getCliente(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'cliente', {headers: headers});
  }
}