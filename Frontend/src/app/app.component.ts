import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ClienteService } from './services/cliente.service';
import { RolService } from './services/rol.service';
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, ClienteService, RolService]
})
export class AppComponent {
  public identity;
  public token;
  public admin: boolean = false;
  public profesor:boolean = false;
  public cliente:boolean = false;

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
          if(Response.rol.id == 1){this.admin = true;}
          if(Response.rol.id == 2){this.profesor = true;}
          if(Response.rol.id == 3){this.cliente = true;}
          console.log(Response);
        }, 
        Error => {
          console.log(<any>Error)
        }
      );
    }
  }

  ngOnInit(){
  	console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
    this.ajusteLogin();
  }

  ajusteLogin(){
    if (!this.identity && !this.token) {
      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");
    }
  }
}
