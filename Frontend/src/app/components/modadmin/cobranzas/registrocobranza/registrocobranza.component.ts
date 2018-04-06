import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CobranzaService } from '../../../../services/cobranza.service';
import { ContratoService } from '../../../../services/contrato.service';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'registrocobranza',
  templateUrl: 'registrocobranza.html',
  providers: [CobranzaService]
})

export class RegistroCobranzaComponent implements OnInit {

  constructor(
    private _cobranzaService: CobranzaService,
    private _contratoService: ContratoService

  ){}

  ngOnInit(){
    //console.log('el componente registro-cobranza ha sido cargado');
  }

  onSubmit(){
  }

  cambio(event):void{
    $( "#tabs1" ).removeClass("tab col s3 disabled").addClass( "tab col s3");
    $( "#tabs2" ).addClass( "tab col s3 disabled" );
    $('ul.tabs').tabs('select_tab', 'test-swipe-1');
  }
}