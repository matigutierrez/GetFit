import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../services/plan.service';
import { SedeService } from '../../../services/sede.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'plan',
  templateUrl: 'plan.html',
  providers:[PlanService, SedeService]
})

export class PlanComponent implements OnInit {
  public planes: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalCreate = new EventEmitter<string|MaterializeAction>();
  public parametros: string;
  public selectOptions: JSON[];
  public clientes: JSON[];
  public plan;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _sedeService: SedeService
  ){
    this._planService.getPlan().subscribe(
      Response => {
        this.planes = Response;
        console.log(this.planes);
      },
      Error => {
        console.log(<any>Error)
      }
    );
    this._sedeService.getSede().subscribe(
      Response => {
        this.selectOptions = Response;
      },
      Error => {
        console.log(<any>Error)
      }
    );
    this.plan = {
      "pla_nombre": "",
      "pla_descripcion": "",
      "pla_costo": "",
      "tgf_sede_id": "1"
    };
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }

  onSubmit(){
    console.log(this.plan);
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
}