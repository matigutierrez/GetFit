import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CobranzaService } from '../../../../services/cobranza.service';
import {MaterializeAction} from 'angular2-materialize';
import { PusherService } from '../../../../services/pusher.service';
import { Cobranza } from '../../../../models/Cobranza';
import { CobranzaComponent } from '../cobranza/cobranza.component';
import { RegistroCobranzaComponent } from '../registrocobranza/registrocobranza.component';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'cobranzas',
  templateUrl: 'cobranzas.html',
  providers: [CobranzaService]
  
})

export class CobranzasComponent implements OnInit {

  @ViewChild(CobranzaComponent)
  public cobranzaComponent: CobranzaComponent;

  @ViewChild(RegistroCobranzaComponent)
  public registroCobranzaComponent: RegistroCobranzaComponent;

  public cobranzas: Cobranza[];
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

  public registrar(): void {
    this.registroCobranzaComponent.abrir();
  }

  public abrirCobranza(cobranza:Cobranza): void {
    this.cobranzaComponent.abrir(cobranza);
  }

  public deleteCobranza(id:number): void {
    this._cobranzaService.delete(id).subscribe(null);
  }

  public onCreate(cobranza:Cobranza): void {
    this.cobranzas.unshift(cobranza);
  }

  public onUpdate(cobranza:Cobranza): void {
    for (let i = 0; i < this.cobranzas.length; i++) {
      if ( this.cobranzas[i].id == cobranza.id ) {
        this.cobranzas[i] = cobranza;
        break;
      }
    }
  }

  public onDelete(id:number): void {
    for (let i = 0; i < this.cobranzas.length; i++) {
      if ( this.cobranzas[i].id == id ) {
        this.cobranzas.splice(i, 1);
        break;
      }
    }
  }

}