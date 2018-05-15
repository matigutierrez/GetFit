import { Component, EventEmitter, OnInit, Input, Output, AfterViewChecked } from '@angular/core';
import { CobranzaService } from '../../../../services/cobranza.service';
import { ContratoService } from '../../../../services/contrato.service';
import { MaterializeAction } from 'angular2-materialize';
declare var $:any;
declare var jQuery:any;

declare var Materialize: any;

@Component({
  selector: 'registrocobranza',
  templateUrl: 'registrocobranza.html',
  providers: [CobranzaService]
})

export class RegistroCobranzaComponent implements OnInit, AfterViewChecked {

  public modal = new EventEmitter<string|MaterializeAction>();

  public constructor(
    private _cobranzaService: CobranzaService,
    private _contratoService: ContratoService

  ){

  }

  public ngOnInit(){
    //console.log('el componente registro-cobranza ha sido cargado');
  }

  public ngAfterViewChecked() {
    if ( Materialize.updateTextFields ) {
      Materialize.updateTextFields();
    }
  }

  public onSubmit(){
    
  }

  public abrir() {
    this.modal.emit({ action:"modal", params:['open'] });
  }

  public cerrar() {
    this.modal.emit({ action:"modal", params:['close'] });
  }

}