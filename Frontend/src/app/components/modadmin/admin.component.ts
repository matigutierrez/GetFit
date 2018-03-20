import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { RolService } from '../../services/rol.service';
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  providers: [UserService, ClienteService, RolService]
})
export class AdminComponent {
  public identity;
  public token;
  public user;
  public admin: boolean;
  public cliente: boolean;

  constructor(
  	private _userService: UserService,
    private _clienteService: ClienteService,
    private _rolService: RolService

  ){
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if(this.token != undefined){
      this._rolService.getRolSesion().subscribe(
        Response => {
          this.user = Response;
          if(this.user.rol_nombre == "Administrador"){
            this.admin = true;
          }else{
            this.cliente = true;
          }
        },
        Error => {
          console.log(<any>Error)
        }
      );
    }
  }

  ngOnInit(){
    this.ajusteLogin();
  }

  ajusteLogin(){
    if (!this.identity && !this.token) {
      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");
    }
  }
}