import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { RolService } from '../../services/rol.service';
import { AuthService } from '../../services/auth.service';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './modprofesor.component.html'
})
export class ModProfesorComponent {

  public identity;
  public token;
  public user;

  public constructor(
  	public _authService: AuthService,
    private _clienteService: ClienteService,
    private _rolService: RolService
  ){

  	this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();

  }

  public ngOnInit(){

    this.ajusteLogin();

  }

  public ajusteLogin(){

    if (!this.identity && !this.token) {

      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");

    }
    
  }
}