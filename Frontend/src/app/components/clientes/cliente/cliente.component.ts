import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { PlanService } from '../../../services/plan.service';
import { RegistroClienteComponent} from '../registrocliente/registrocliente.component';
import {MaterializeAction} from 'angular2-materialize';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cliente',
  templateUrl: 'cliente.html',
  providers: [ClienteService, PlanService]
  
})

export class ClienteComponent implements OnInit {
  public clientes: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService

  ){
    this._clienteService.getCliente().subscribe(
      Response  => {
        console.log(Response);
        this.clientes = Response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit(){
    console.log('el compenente cliente a sido cargado');
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}