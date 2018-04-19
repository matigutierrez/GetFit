import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/Plan';
import { Sede } from '../../../../models/Sede';

@Component({
  selector: 'registroplan',
  templateUrl: 'registroplan.html',
  providers: [PlanService, SedeService]
})

export class RegistroPlanComponent implements OnInit {

  public modalRegistroPlan = new EventEmitter<string|MaterializeAction>();

  public plan;
  public selectOptions: Sede[];

  constructor(
    private _planService: PlanService,
    private _sedeService: SedeService
  ){
    this.plan = new Plan();
    this.plan.tgf_sede_id = 1;

    this._sedeService.query().subscribe(
      Response => {
        this.selectOptions = Response;
      },
      Error => {
        console.log(<any>Error)
      }
    );
  }

  public onSubmit(){
    console.log(this.plan);
  }

  public ngOnInit(){
    //console.log('el compenente registro-plan ha sido cargado');
  }

  public abrir() {
    this.modalRegistroPlan.emit({ action:"modal", params:['open'] });
  }

  public cerrar() {
    this.modalRegistroPlan.emit({ action:"modal", params:['close'] });
  }

}