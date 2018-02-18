import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'horario',
  templateUrl: 'horario.html',
  providers:[PlanService]
})

export class HorarioComponent implements OnInit {

  constructor(
    private _planService: PlanService
  ){

  }

  onSubmit(){
    
  }

  ngOnInit(){
    console.log('el compenente horario a sido cargado');
  }
}