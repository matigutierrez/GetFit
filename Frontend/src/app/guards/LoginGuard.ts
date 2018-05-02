import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  public constructor(
    public router: Router,
    private authService: AuthService
  ) {

  }

  public canActivate(): boolean {

    if ( this.authService.isAuthenticated() ) {

      switch ( this.authService.getRolID() ) {

        case 1:
          this.router.navigate(["/admin"]);
          return false;
        case 2:
          this.router.navigate(["/profesor"]);
          return false;
        case 3:
          this.router.navigate(["/cliente"]);
          return false;
        default:
          // Si no tiene rol, enviar a vista de login
          return true;
        
      }

    }

    // Si no hay token, enviar a vista de login
    return true;

  }

}