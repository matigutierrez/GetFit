import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/Plan';
import { Sede } from '../../../../models/Sede';
import { TipoPlanService } from '../../../../services/tipoplan.service';
import { TipoPlan } from '../../../../models/TipoPlan';

declare var Materialize: any;

@Component({
  selector: 'editarplan',
  templateUrl: 'editarplan.html',
  providers: [PlanService, SedeService]
})

export class EditarPlanComponent implements OnInit, AfterViewChecked {

  // Plan a editar
  @Input("plan")
  public plan: Plan;

  // Lista de sedes
  public sedes: Sede[];

  // Lista de tipos de planes
  public tipoPlanes: TipoPlan[];

  // Indicar a la vista si se está enviando la edición
  public editando: boolean;

  public constructor(
    private _planService: PlanService,
    private _sedeService: SedeService,
    private _tipoPlanService: TipoPlanService
  ){

    this._sedeService.query().subscribe(
      Response => {
        this.sedes = Response;
      }
    );

    this._tipoPlanService.query().subscribe(
      Response => {
        this.tipoPlanes = Response;
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
    // Indicar que se está modificando el plan
    this.editando = true;

    // Enviar modificaciones al servidor
    this._planService.update(this.plan).subscribe(
      Response => {
        // Indicar a la vista que las modificaciones ya se recibieron
        this.editando = false;
      }
    )

  }

}