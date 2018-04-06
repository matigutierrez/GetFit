import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';
import { Cliente } from '../models/cliente';

@Injectable()
export class ClienteService{

  constructor(
    private _http: HttpClient
  ){
    
  }

  save(cliente:Cliente): Observable<number>{
    return this._http.post<number>(GLOBAL.url+'cliente', cliente);
  }

  query(): Observable<Cliente[]>{
    return this._http.get<Cliente[]>(GLOBAL.url+'cliente');
  }

  get(id:number): Observable<Cliente>{
    return this._http.get<Cliente>(GLOBAL.url+'cliente/' + id);
  }

  delete(id:number): Observable<any>{
    return this._http.delete(GLOBAL.url+'cliente/' + id);
  }

}