import { Component, OnInit, EventEmitter, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/Plan';
import { Sede } from '../../../../models/Sede';
import { TipoPlanService } from '../../../../services/tipoplan.service';
import { TipoPlan } from '../../../../models/TipoPlan';

declare var Materialize: any;

@Component({
  selector: 'registroplan',
  templateUrl: 'registroplan.html'
})

export class RegistroPlanComponent implements OnInit, AfterViewChecked {

  // Modal del componente
  public modal = new EventEmitter<string | MaterializeAction>();

  // Plan que se va a registrar
  public plan: Plan;

  // Lista de sedes
  public sedes: Sede[];

  // Lista de tipos de planes
  public tipoPlanes: TipoPlan[];

  public constructor(
    private _planService: PlanService,
    private _sedeService: SedeService,
    private _tipoPlanService: TipoPlanService
  ) {

    this.limpiar();

    // Solicitar sedes
    this._sedeService.query().subscribe(
      Response => {
        this.sedes = Response;
      }
    );

    // Solicitar tipos de planes
    this._tipoPlanService.query().subscribe(
      Response => {
        this.tipoPlanes = Response;
      }
    );

  }

  public ngOnInit() {
    //console.log('el compenente registro-plan ha sido cargado');
  }

  public ngAfterViewChecked() {
    if (Materialize.updateTextFields) {
      Materialize.updateTextFields();
    }
  }

  public limpiar() {
    this.plan = new Plan();
    this.plan.pla_solicitable = 1;
    this.plan.tgf_sede_id = 1;
    this.plan.tgf_tipo_plan_id = 1;
  }

  public onSubmit() {
    // Si la sede y el tipo de plan no son nulos
    if ( this.plan.tgf_sede_id != null && this.plan.tgf_tipo_plan_id != null ) {

      // Registrar plan
      this._planService.save(this.plan).subscribe(
        Response => {
          this.cerrar();
          this.limpiar();
        }
      );
    }
  }

  public abrir() {
    this.modal.emit({ action: "modal", params: ['open'] });
  }

  public cerrar() {
    this.modal.emit({ action: "modal", params: ['close'] });
  }

}