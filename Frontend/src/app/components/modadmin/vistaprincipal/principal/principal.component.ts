import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'principal.html'
})

export class PrincipalComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    //console.log('el componente principal ha sido cargado');
  }
}