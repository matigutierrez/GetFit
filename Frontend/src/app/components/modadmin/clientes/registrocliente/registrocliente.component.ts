import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ClienteService } from '../../../../services/cliente.service';
import { ClienteComponent } from '../cliente/cliente.component';
import { Cliente } from '../../../../models/cliente';
import { Plan } from '../../../../models/Plan';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'registrocliente',
  templateUrl: 'registrocliente.html',
  providers: [ClienteService, ClienteComponent]
})

export class RegistroClienteComponent implements OnInit {
  public cliente;
  public client:string;
  @Input() planid: string;

  constructor(
    private _clienteService: ClienteService,
    private _clienteComponent: ClienteComponent

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
    //console.log('el componente registro-cliente ha sido cargado');
  }

  onSubmit(){
    this._clienteService.save(this.cliente).subscribe(
      Response => {

        // Pasar a la vista de ingresar usuario
        $( "#tabs2" ).removeClass("tab col s3 disabled").addClass( "tab col s3");
        $('ul.tabs').tabs('select_tab', 'test-swipe-2');
        $( "#tabs1" ).addClass( "tab col s3 disabled" );

        // Insertar dato al registro de clientes
        this.cliente.id = Response.toString();

        // NO FUNCIONA????
        this._clienteComponent.clientes.unshift( JSON.parse(JSON.stringify(this.cliente)) );

      },
      error => {
        console.log(<any>error);
      }
    );
  }

  cambio(event):void{
    $( "#tabs1" ).removeClass("tab col s3 disabled").addClass( "tab col s3");
    $( "#tabs2" ).addClass( "tab col s3 disabled" );
    $('ul.tabs').tabs('select_tab', 'test-swipe-1');
  }
}