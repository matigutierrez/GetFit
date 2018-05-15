import { Component, OnInit, EventEmitter, Input, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeAction, MaterializeModule } from 'angular2-materialize';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/Plan';
import { Sede } from '../../../../models/Sede';

declare var Materialize: any;

@Component({
  selector: 'editarplan',
  templateUrl: 'editarplan.html',
  providers: [PlanService, SedeService]
})

export class EditarPlanComponent implements OnInit, AfterViewChecked {

  public modalRegistroPlan = new EventEmitter<string|MaterializeAction>();

  public plan: Plan;
  public selectOptions: Sede[];

  public constructor(
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

  public ngOnInit(){
    //console.log('el compenente editar-plan ha sido cargado');
  }

  public ngAfterViewChecked() {
    if ( Materialize.updateTextFields ) {
      Materialize.updateTextFields();
    }
  }

  public onSubmit(){
    console.log(this.plan);
  }

  @Input("plan")
  set setPlan(plan:Plan) {
    this.plan = plan;
  }

}