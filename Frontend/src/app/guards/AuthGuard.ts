import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var $:any;
declare var jQuery:any;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login/1']);
      return false;
    }
    return true;
  }
}