import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { PlanService } from '../../../services/plan.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'vistaclientes',
  templateUrl: 'vistaclientes.html',
  providers: [ClienteService, PlanService]
})

export class VistaClientesComponent implements OnInit {
  public clientes: JSON[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService

  ){
    this._clienteService.getCliente().subscribe(
      Response => {
        this.clientes = Response;
        console.log(this.clientes);
      }, Error => {
        console.log(<any>Error);
      }
    );
  }

  ngOnInit(){
    console.log('el compenente cliente a sido cargado');
  }  
}