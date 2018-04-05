import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class ClienteService{

  constructor(
    private _http: HttpClient
  ){
    
  }

  save(cliente): Observable<any>{
    return this._http.post(GLOBAL.url+'cliente', cliente);
  }

  query(): Observable<any>{
    return this._http.get(GLOBAL.url+'cliente');
  }

  get(id): Observable<any>{
    return this._http.get(GLOBAL.url+'cliente/' + id);
  }

  delete(id): Observable<any>{
    return this._http.delete(GLOBAL.url+'cliente/' + id);
  }

}