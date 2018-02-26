import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'vistacliente',
  templateUrl: 'vistacliente.html'
})

export class VistaClienteComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    console.log('el compenente principal a sido cargado');
  }
}