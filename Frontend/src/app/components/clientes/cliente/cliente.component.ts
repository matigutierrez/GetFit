import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { PlanService } from '../../../services/plan.service';
import {MaterializeAction} from 'angular2-materialize';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cliente',
  templateUrl: 'cliente.html',
  providers: [ClienteService, PlanService]
})

export class ClienteComponent implements OnInit {
  public cliente;
  public clientes: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService

  ){
    this.cliente = {
      "cli_rut": "",
      "cli_nombres": "",
      "cli_apellidos": "",
      "cli_numerotelefonico": "",
      "cli_direccion": "",
      "cli_huella": "",
    };
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

  onSubmit(){
    console.log(this.cliente);
  }

  openModal(contratos) {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}