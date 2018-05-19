import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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

  public plan: Plan;
  public selectOptions: Sede[];

  public editando: boolean;

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

    this.editando = true;

    this._planService.update(this.plan).subscribe(
      Response => {

        this.editando = false;

      }
    )

  }

  @Input("plan")
  set setPlan(plan:Plan) {
    this.plan = plan;
  }

}