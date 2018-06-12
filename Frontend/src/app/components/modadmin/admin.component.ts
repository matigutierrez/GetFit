import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './admin.component.html'
})
export class AdminComponent {

    public identity;
    public token;

    public constructor(
        public _authService: AuthService
    ) {

        this.identity = this._authService.getIdentity();
        this.token = this._authService.getToken();

    }

    public ngOnInit() {

        this.ajusteLogin();

    }

    public ajusteLogin() {

        if (!this.identity && !this.token) {

            $("main").css("padding-left", "0px");
            $("header").css("padding-left", "0px");

        }

    }
}