import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    return !this.jwtHelper.isTokenExpired(token);
  }
}