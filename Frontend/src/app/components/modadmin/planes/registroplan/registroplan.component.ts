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
    this.plan = new Plan();
    this.plan.tgf_sede_id = 1;

    this._sedeService.query().subscribe(
      Response => {
        this.sedes = Response;
      }
    );

    this._tipoPlanService.query().subscribe(
      Response => {
        this.tipoPlanes = Response;
        console.log(this.tipoPlanes);
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

  public onSubmit() {
    this._planService.save(this.plan).subscribe(
      Response => {
        this.cerrar();
      }
    );
  }

  public abrir() {
    this.modal.emit({ action: "modal", params: ['open'] });
  }

  public cerrar() {
    this.modal.emit({ action: "modal", params: ['close'] });
  }

}