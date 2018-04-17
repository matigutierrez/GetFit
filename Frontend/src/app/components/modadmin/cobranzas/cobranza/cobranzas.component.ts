import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../../services/cobranza.service';
import {MaterializeAction} from 'angular2-materialize';
import { PusherService } from '../../../../services/pusher.service';
import { Cobranza } from '../../../../models/Cobranza';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cobranzas',
  templateUrl: 'cobranzas.html',
  providers: [CobranzaService]
  
})

export class CobranzasComponent implements OnInit {

  public cobranzas: Cobranza[];
  public modalActions = new EventEmitter<string|MaterializeAction>();
  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();
  public p: number = 1;

  private channel: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cobranzaService: CobranzaService,
    private _pusherService: PusherService
  ){
    this._cobranzaService.query().subscribe(
      Response  => {
        this.cobranzas = Response;
      }, error => {
        console.log(<any>error);
      }
    );

    this.channel = this._pusherService.getPusher().subscribe("cobranza");
    this.channel.bind("create", data => { this.onCreate(data) });
    this.channel.bind("update", data => { this.onUpdate(data) });
    this.channel.bind("delete", data => { this.onDelete(data) });
  }

  public ngOnInit(){
    //console.log('el componente cobranzas ha sido cargado');
  }

  public openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  public closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

  public deleteCobranza(id:number) {
    this._cobranzaService.delete(id).subscribe(null);
  }

  public onCreate(cobranza:Cobranza) {
    this.cobranzas.unshift(cobranza);
  }

  public onUpdate(cobranza:Cobranza) {
    for (let i = 0; i < this.cobranzas.length; i++) {
      if ( this.cobranzas[i].id == cobranza.id ) {
        this.cobranzas[i] = cobranza;
        break;
      }
    }
  }

  public onDelete(id:number) {
    for (let i = 0; i < this.cobranzas.length; i++) {
      if ( this.cobranzas[i].id == id ) {
        this.cobranzas.splice(i, 1);
        break;
      }
    }
  }

}