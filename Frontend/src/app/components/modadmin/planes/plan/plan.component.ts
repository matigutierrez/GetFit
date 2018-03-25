import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../../services/plan.service'
import {MaterializeAction} from 'angular2-materialize';
import { Plan } from '../../../../models/plan';
import { Cliente } from '../../../../models/cliente';

@Component({
  selector: 'plan',
  templateUrl: 'plan.html',
  providers:[PlanService]
})

export class PlanComponent implements OnInit {
  public planes: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalCreate = new EventEmitter<string|MaterializeAction>();
  public modalUser = new EventEmitter<string|MaterializeAction>();
  public parametros: string;
  public clientes: JSON[];
  public planid: string;
  public p: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService
  ){
    this._planService.query().subscribe(
      Response => {
        this.planes = Response;
        console.log(this.planes);
      },
      Error => {
        console.log(<any>Error)
      }
    );
  }

  ngOnInit(){
    console.log('el compenente registro ha sido cargado');
  }

  openModal(contratos) {
    this.modalActions.emit({action:"modal",params:['open']});
    this.clientes = contratos;
    console.log(this.clientes);
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  openCreate() {
    this.modalCreate.emit({action:"modal",params:['open']});
  }
  closeCreate() {
    this.modalCreate.emit({action:"modal",params:['close']});
  }

  openUser(id) {
    this.planid = id;
    this.modalUser.emit({action:"modal",params:['open']});
  }
  closeUser() {
    this.modalUser.emit({action:"modal",params:['close']});
  }
}