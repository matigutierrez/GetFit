import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class SedeService{
  public url: string;

  constructor(
    private _http: HttpClient,
    private _userService: UserService

  ){
    this.url = GLOBAL.url;
  }

  registry(sede): Observable<any>{
    let params = JSON.stringify(sede);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.post(this.url+'sede', params, {headers: headers});
  }

  getSede(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'sede', {headers: headers});
  }

  getSedeId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.get(this.url+'sede/'+params, {headers: headers});
  }

  deleteSedeId(id): Observable<any>{
    let params = JSON.stringify(id);
    let headers = new HttpHeaders().set('Authorization', this._userService.getToken());

    return this._http.delete(this.url+'sede/'+params, {headers: headers});
  }
}