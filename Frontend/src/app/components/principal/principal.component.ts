import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'principal',
  templateUrl: 'principal.html'
})

export class PrincipalComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    console.log('el compenente principal a sido cargado');
  }
}