import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {UserService} from './user.service';

@Injectable()
export class ClienteService{
	public url: string;

	constructor(
		private _http: Http,
		private _userService: UserService

	){
		this.url = GLOBAL.url;
	}

	registry(cliente){
		let params = JSON.stringify(cliente);
		let headers = new Headers({'Authorization': this._userService.getToken()});

		return this._http.post(this.url+'cliente', params, {headers: headers}).map(res => res.json());
	}

	getCliente(){
		let headers = new Headers({'Authorization': this._userService.getToken()});

		return this._http.get(this.url+'cliente', {headers: headers}).map(res => res.json());
	}
}