import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { Cliente } from '../../../../models/cliente';
import { MaterializeAction } from 'angular2-materialize';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'sede',
  templateUrl: 'sede.html',
  providers: [SedeService]
  
})

export class SedeComponent implements OnInit {
  public sedes: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();
  public p: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sedeService: SedeService

  ){
    this._sedeService.query().subscribe(
      Response  => {
        this.sedes = Response;
      }, error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit(){
    //console.log('el componente sede ha sido cargado');
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}