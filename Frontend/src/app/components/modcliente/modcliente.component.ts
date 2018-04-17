import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClienteService } from '../../services/cliente.service';
import { RolService } from '../../services/rol.service';
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-root',
  templateUrl: './modcliente.component.html',
  providers: [UserService, ClienteService, RolService]
})
export class ModClienteComponent {
  public identity;
  public token;
  public user;

  constructor(
  	private _userService: UserService,
    private _clienteService: ClienteService,
    private _rolService: RolService

  ){
  	this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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