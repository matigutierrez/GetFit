import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../../services/plan.service'
import {MaterializeAction} from 'angular2-materialize';
import { Plan } from '../../../../models/Plan';
import { Cliente } from '../../../../models/cliente';
import { PusherService } from '../../../../services/pusher.service';

@Component({
  selector: 'plan',
  templateUrl: 'plan.html',
  providers:[PlanService]
})

export class PlanComponent implements OnInit {

  public planes: Plan[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalCreate = new EventEmitter<string|MaterializeAction>();
  public modalUser = new EventEmitter<string|MaterializeAction>();
  public parametros: string;
  public clientes: JSON[];
  public planid: string;
  public p: number = 1;

  private channel: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _pusherService: PusherService
  ){
    this._planService.query().subscribe(
      Response => {
        this.planes = Response;
      },
      Error => {
        console.log(<any>Error)
      }
    );

    this.channel = this._pusherService.getPusher().subscribe('plan');
    this.channel.bind('create', data => { this.onCreate(data) });
    this.channel.bind('update', data => { this.onUpdate(data) });
    this.channel.bind('delete', data => { this.onDelete(data) });
  }

  public ngOnInit(){
    //console.log('el componente plan ha sido cargado');
  }

  public openModal(contratos) {
    this.modalActions.emit({action:"modal",params:['open']});
    this.clientes = contratos;
  }

  public closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  public openCreate() {
    this.modalCreate.emit({action:"modal",params:['open']});
  }

  public closeCreate() {
    this.modalCreate.emit({action:"modal",params:['close']});
  }

  public openUser(id) {
    this.planid = id;
    this.modalUser.emit({action:"modal",params:['open']});
  }

  public closeUser() {
    this.modalUser.emit({action:"modal",params:['close']});
  }

  public deletePlan(id:number) {
    this._planService.delete(id).subscribe(null);
  }

  public onCreate(plan:Plan) {
    this.planes.unshift(plan);
  }

  public onUpdate(plan:Plan) {
    for (let i = 0; i < this.planes.length; i++) {
      if ( this.planes[i].id == plan.id ) {
        this.planes[i] = plan;
        break;
      }
    }
  }

  public onDelete(id:number) {
    for (let i = 0; i < this.planes.length; i++) {
      if ( this.planes[i].id == id ) {
        this.planes.splice(i, 1);
        break;
      }
    }
  }

}