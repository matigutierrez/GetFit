import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs/Observable';
import { RolService } from './rol.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  public constructor(
    private jwtHelper: JwtHelperService,
    private _http: HttpClient,
    private _rolService: RolService,
    private _router: Router
  ) {

  }
  
  public isAuthenticated(): boolean {

    let token: string = this.getToken();

    if ( token != null ) {

      return !this.jwtHelper.isTokenExpired( token );

    }

    return false;

  }

  public login(user:Usuario): Observable<any> {

    return this._http.post(GLOBAL.url+'login', user);

  }

  public logout(): void {

    this.removeIdentity();
    this.removeToken();
    this.removeRolID();

    this._router.navigate(["/login"]);

  }

  public getRolID(): number {

    return JSON.parse(localStorage.getItem('rol'));

  }

  public setRolID(rolID:number): void {

    localStorage.setItem('rol', JSON.stringify(rolID));

  }

  public removeRolID(): void {

    localStorage.removeItem('rol');

  }

  public getToken(): string {

    return JSON.parse(localStorage.getItem('token'));

  }

  public setToken(token:string) {

    localStorage.setItem('token', JSON.stringify(token));

  }

  public removeToken(): void {

    localStorage.removeItem('token');

  }

  public getIdentity(): string {

    return JSON.parse(localStorage.getItem('identity'));

  }

  public setIdentity(identity:string): void {

    localStorage.setItem('identity', JSON.stringify(identity));

  }

  public removeIdentity(): void {

    localStorage.removeItem('identity');

  }

}