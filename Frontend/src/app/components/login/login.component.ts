import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public user;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

  ){
    this.user = {
      "usu_correo": "",
      "password": ""
    };
  }

  ngOnInit(){
    console.log('el compenente login a sido cargado');
    //console.log(this._userService.getIdentity());
    //console.log(this._userService.getToken());
    this.logout();
    this.redirectIfIdentity();
  }
  //Redireccion si hay un usuario logeado y token
  redirectIfIdentity(){
    let identity = this._userService.getIdentity();
    let token = this._userService.getToken();

    if (identity != null && token != null) {
      this._router.navigate(["/getfit"]);
    }
  }

  onSubmit(){
    console.log(this.user);
    this._userService.signin(this.user).subscribe(
      Response => {
        this.identity = Response.usuario.usu_correo;
        this.token = Response.token;
        if (this.identity.length <= 1) {
          console.log("error en el servidor")
        }{
          if (!this.identity.status && !this.token.status) {
            localStorage.setItem('identity', JSON.stringify(this.identity));
            localStorage.setItem('token', JSON.stringify(this.token));
          }
          if (Response.usuario.rol.id == 1){
            // Administrador
            window.location.href = '/getfit/principal';
          }else if (Response.usuario.rol.id == 2) {
            // Profesor
            window.location.href = '/getfit/principal';
          }else if (Response.usuario.rol.id == 3){
            // Cliente
            window.location.href = '/getfitc/cliente';
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

        this.identity = null;
        this.token = null;

        window.location.href = '/login';
      }
    })
  }
}