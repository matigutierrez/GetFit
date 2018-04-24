import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { Cliente } from '../../../../models/Cliente';
import { Sede } from '../../../../models/Sede';
import { MaterializeAction } from 'angular2-materialize';
import { RegistroSedeComponent } from '../registrosede/registrosede.component';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'sede',
  templateUrl: 'sede.html',
  providers: [SedeService]
  
})

export class SedeComponent implements OnInit {

  @ViewChild(RegistroSedeComponent)
  public registroSede: RegistroSedeComponent;

  public sedes: Sede[];
  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();
  public p: number = 1;

  public constructor(
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

  public ngOnInit(){
    //console.log('el componente sede ha sido cargado');
  }
  
}