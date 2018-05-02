import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ProfesorGuard implements CanActivate {

  public constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  public canActivate(): boolean {

    if ( this.authService.isAuthenticated() ) {

      return this.authService.getRolID() == 2;

    }

    this.router.navigate(["/login"]);

    return false;
    
  }
}