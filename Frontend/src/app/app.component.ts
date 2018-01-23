import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'app';
  public identity;
  public token;

  constructor(
  	private _userService: UserService
  ){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  }

  ngOnInit(){
  	console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());
    this._userService.getUsuarios(this._userService.getToken()).subscribe(
      Response => {
        console.log(Response);
      }, Error => {
        console.log(Error);
      });
    this.ajusteLogin();
  }

  ajusteLogin(){
    if (!this.identity && !this.token) {
      $("main").css("padding-left", "0px");
      $("header").css("padding-left", "0px");
    }
  }
}
