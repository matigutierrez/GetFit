import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
declare var $:any;
declare var jQuery:any;


@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  providers: [UserService]
})
export class AdminComponent {
  public identity;
  public token;

  constructor(
  	private _userService: UserService

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