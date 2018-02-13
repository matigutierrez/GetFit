import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Plan } from '../../../models/plan';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'registrocliente',
  templateUrl: 'registrocliente.html',
  providers: [ClienteService]
})

export class RegistroClienteComponent implements OnInit {
  public cliente;
  public client:string;
  @Input() planid: string;

  constructor(
    private _clienteService: ClienteService

  ){
    this.cliente = {
      "cli_rut": "",
      "cli_nombres": "",
      "cli_apellidos": "",
      "cli_numerotelefonico": "",
      "cli_direccion": "",
      "cli_huella": "",
    };
    this.client = "2";
  }

  ngOnInit(){
    console.log('el compenente cliente a sido cargado');
  }

  onSubmit(){
    console.log(this.cliente);
    $( "#tabs2" ).removeClass("tab col s3 disabled").addClass( "tab col s3");
    $('ul.tabs').tabs('select_tab', 'test-swipe-2');
    $( "#tabs1" ).addClass( "tab col s3 disabled" );
    if(this.planid != undefined){
      console.log(this.planid);
    }
  }

  cambio(event):void{
    $( "#tabs1" ).removeClass("tab col s3 disabled").addClass( "tab col s3");
    $( "#tabs2" ).addClass( "tab col s3 disabled" );
    $('ul.tabs').tabs('select_tab', 'test-swipe-1');
  }
}