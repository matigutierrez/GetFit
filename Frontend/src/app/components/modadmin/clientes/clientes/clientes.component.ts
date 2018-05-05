import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/Cliente';
import { PlanService } from '../../../../services/plan.service';
import { MaterializeAction } from 'angular2-materialize';
import { PusherService } from '../../../../services/pusher.service';
import { RegistroClienteComponent } from '../registrocliente/registrocliente.component';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'clientes',
  templateUrl: 'clientes.html',
  providers: [ClienteService, PlanService]
  
})

export class ClientesComponent implements OnInit {

  // Lista de clientes
  public clientes: Cliente[];

  @ViewChild(RegistroClienteComponent)
  public registroCliente: RegistroClienteComponent;

  public modalActionsUsuario = new EventEmitter<string|MaterializeAction>();
  public p: number = 1;

  private channel: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService,
    private _pusherService: PusherService

  ){
    this._clienteService.query().subscribe(
      Response  => {
        this.clientes = Response;
      }, error => {
        console.log(<any>error);
      }
    );

    this.channel = this._pusherService.getPusher().subscribe('cliente');
    this.channel.bind('create', data => { this.onCreate(data) });
    this.channel.bind('update', data => { this.onUpdate(data) });
    this.channel.bind('delete', data => { this.onDelete(data) });
  }

  public ngOnInit(){
    //console.log('el componente cliente ha sido cargado');
  }

  public deleteCliente(id:number) {
    this._clienteService.delete(id).subscribe(null);
  }

  public onCreate(data:Cliente) {
    this.clientes.unshift(data);
  }

  public onUpdate(data:Cliente) {
    for (let i = 0; i < this.clientes.length; i++) {
      if ( this.clientes[i].id == data.id ) {
        this.clientes[i] = data;
      }
    }
  }

  public onDelete(id:number) {
    for (let i = 0; i < this.clientes.length; i++) {
      if ( this.clientes[i].id == id ) {
        this.clientes.splice(i, 1);
        break;
      }
    }
  }
}