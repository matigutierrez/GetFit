import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/Usuario';

declare var Materialize: any;

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent implements OnInit, AfterViewChecked {

  public user;

  public constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) {

    this.user = new Usuario();

  }

  public ngOnInit() {
    //console.log('el componente login ha sido cargado');
  }

  public ngAfterViewChecked() {
    if ( Materialize.updateTextFields ) {
      Materialize.updateTextFields();
    }
  }

  public onSubmit() {

    this._authService.login(this.user).subscribe(
      Response => {

        let identity = Response.usuario.usu_correo;
        let token = Response.token;

        if (identity.length <= 1) {
          console.log("error en el servidor");
        } {

          if (!identity.status && !token.status) {
            this._authService.setIdentity(identity);
            this._authService.setToken(token);
            this._authService.setRolID(Response.usuario.rol.id);
          }

          switch (this._authService.getRolID()) {
            case 1:
              // Administrador
              this._router.navigate(["/admin"]);
              break;
            case 2:
              // Profesor
              this._router.navigate(["/profesor"]);
              break;
            case 3:
              // Cliente
              this._router.navigate(["/cliente"]);
              break;
          }
        }
      },
      Error => {
        console.log(<any>Error)
      }
    );
  }
  
}