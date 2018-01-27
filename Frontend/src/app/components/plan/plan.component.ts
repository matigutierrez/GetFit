import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'plan',
  templateUrl: 'plan.html',
  providers:[PlanService]
})

export class PlanComponent implements OnInit {
  public planes: JSON[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService
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
  }

  ngOnInit(){
    console.log('el compenente registro a sido cargado');
  }
}