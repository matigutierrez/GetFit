import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../../services/cobranza.service';
import {MaterializeAction} from 'angular2-materialize';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cobranzas',
  templateUrl: 'cobranzas.html',
  providers: [CobranzaService]
  
})

export class CobranzasComponent implements OnInit {
  public cobranzas: JSON[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();
  public p: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cobranzasService: CobranzaService

  ){
    this._cobranzasService.query().subscribe(
      Response  => {
        this.cobranzas = Response;
        console.log(this.cobranzas);
      }, error => {
        console.log(<any>error);
      }
    );
  }

  ngOnInit(){
    //console.log('el componente cobranzas ha sido cargado');
  }

  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}