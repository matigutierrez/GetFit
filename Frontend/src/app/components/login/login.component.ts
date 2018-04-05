import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {

  public user;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _authService: AuthService

  ){
    this.user = {
      "usu_correo": "",
      "password": ""
    };
  }

  ngOnInit(){
    console.log('el compenente login a sido cargado');
    this.logout();
  }

  onSubmit(){
    
    this._userService.signin(this.user).subscribe(
      Response => {
        let identity = Response.usuario.usu_correo;
        let token = Response.token;
        if (identity.length <= 1) {
          console.log("error en el servidor");
        }{
          if (!identity.status && !token.status) {
            this._authService.setIdentity(identity);
            this._authService.setToken(token);
          }
          if (Response.usuario.rol.id == 1){
            // Administrador
            this._router.navigate(["/admin"]);
          }else if (Response.usuario.rol.id == 2) {
            // Profesor
            this._router.navigate(["/profesor"]);
          }else if (Response.usuario.rol.id == 3){
            // Cliente
            this._router.navigate(["/cliente"]);
          }
        }
      },
      Error => {
        console.log(<any>Error)
      }
    );
  }

  logout(){
    this._route.params.forEach((params: Params) => {
      let logout = +params['id'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        window.location.href = '/login';
      }
    })
  }
}