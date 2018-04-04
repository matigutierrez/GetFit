import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'vistacliente.html'
})

export class VistaClienteComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit(){
    //console.log('el compenente vistacliente ha sido cargado');
  }
}