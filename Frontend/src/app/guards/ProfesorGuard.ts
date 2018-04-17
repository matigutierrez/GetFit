import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RolService } from '../services/rol.service';

@Injectable()
export class ProfesorGuard implements CanActivate {

  private sesion = false;

  constructor(public router: Router, private rolService: RolService) {}

  canActivate(): boolean {
    this.rolService.getRolSesion().subscribe(
      Response => {
        if (Response.id == 1) {
          this.router.navigate(["/admin"]);
        } else if(Response.id == 2) {
          this.router.navigate(["/profesor"]);
        } else if(Response.id == 3) {
          this.router.navigate(["/cliente"]);
        }
        this.sesion = Response.id == 2;
      }, Error => {
        console.log(<any>Error);
        this.sesion = false;
      }
    )
    return this.sesion;
  }
}