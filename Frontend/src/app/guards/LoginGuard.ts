import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RolService } from '../services/rol.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public router: Router,
    private rolService: RolService,
    private authService: AuthService
  ) {

  }

  canActivate(): boolean {

    if ( this.authService.isAuthenticated() ) {

      let sesion: boolean = true;
      
      this.rolService.getRolSesion().subscribe(
        Response => {
          if (Response.id == 1) {
            this.router.navigate(["/admin"]);
          } else if(Response.id == 2) {
            this.router.navigate(["/profesor"]);
          } else if(Response.id == 3) {
            this.router.navigate(["/cliente"]);
          }
          sesion = false;
        }, Error => {
          sesion = true;
        }
      )

      return sesion;

    }

    return true;
  }
}