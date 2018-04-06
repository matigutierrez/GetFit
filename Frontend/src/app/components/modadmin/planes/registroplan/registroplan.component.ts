import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../../services/plan.service';
import { SedeService } from '../../../../services/sede.service';
import { Plan } from '../../../../models/plan';

@Component({
  selector: 'registroplan',
  templateUrl: 'registroplan.html',
  providers:[PlanService, SedeService]
})

export class RegistroPlanComponent implements OnInit {
  public plan;
  public selectOptions: JSON[];

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

  onSubmit(){
    console.log(this.plan);
  }

  ngOnInit(){
    //console.log('el compenente registro-plan ha sido cargado');
  }
}