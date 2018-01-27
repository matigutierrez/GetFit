import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: 'registro.html'
})

export class RegistroComponent implements OnInit {
  

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){
    
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }
}