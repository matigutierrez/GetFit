import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/Plan';
import { Sede } from '../../../../models/Sede';

@Component({
  selector: 'editarplan',
  templateUrl: 'editarplan.html',
  providers: [PlanService, SedeService]
})

export class EditarPlanComponent implements OnInit {

  public modalRegistroPlan = new EventEmitter<string|MaterializeAction>();

  public plan: Plan;
  public selectOptions: Sede[];

  constructor(
    private _planService: PlanService,
    private _sedeService: SedeService
  ){

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

  public abrir(plan: Plan) {
    this.plan = plan;
    this.modalRegistroPlan.emit({ action:"modal", params:['open'] });
  }

  public cerrar() {
    this.modalRegistroPlan.emit({ action:"modal", params:['close'] });
  }

}