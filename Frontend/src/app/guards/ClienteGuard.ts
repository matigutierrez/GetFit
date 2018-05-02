import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ClienteGuard implements CanActivate {

  public constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  public canActivate(): boolean {

    if ( this.authService.isAuthenticated() ) {

      return this.authService.getRolID() == 3;

    }

    this.router.navigate(["/login"]);

    return false;
    
  }
}