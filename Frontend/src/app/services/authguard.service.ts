import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
declare var $:any;
declare var jQuery:any;

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      return false;
    }
    console.log("hola");
    return true;
  }
}