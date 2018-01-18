import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'registro',
  templateUrl: 'registro.html'
})

export class RegistroComponent implements OnInit {
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.title = 'hola'; 
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }
}