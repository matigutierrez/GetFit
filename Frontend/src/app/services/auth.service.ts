import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }
  
  public isAuthenticated(): boolean {

    let token: string = this.getToken();

    if ( token != null ) {

      return !this.jwtHelper.isTokenExpired( token );

    }

    return false;

  }

  public getToken(): string {
    return JSON.parse(localStorage.getItem('token'));
  }

  public setToken(token:string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  public getIdentity(): string {
    return JSON.parse(localStorage.getItem('identity'));
  }

  public setIdentity(identity:string) {
    localStorage.setItem('identity', JSON.stringify(identity));
  }

  public removeIdentity() {
    localStorage.removeItem('identity');
  }

}