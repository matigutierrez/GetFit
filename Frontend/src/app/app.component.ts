import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { ClienteService } from './services/cliente.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, ClienteService]
})
export class AppComponent {
  title = 'app';
  public identity;
  public token;

  constructor(
  	private _userService: UserService,
    private _clienteService: ClienteService
  ){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(){
  	console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
    /*this._userService.getUsuarios().subscribe(
      Response => {
        console.log(Response);
      }, Error => {
        console.log(Error);
      });*/
    this.ajusteLogin();
    /*this._clienteService.getCliente().subscribe(
      Response => {
        console.log(Response);
      }, Error => {
        console.log(Error);
      }
    );*/
  }

  ajusteLogin(){
    if (!this.identity && !this.token) {
      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");
    }
  }
}
