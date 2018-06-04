import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/Cliente';
import { PlanService } from '../../../../services/plan.service';
import { PusherService } from '../../../../services/pusher.service';
import { RegistroClienteComponent } from '../registrocliente/registrocliente.component';
import { Contrato } from '../../../../models/Contrato';
import { ContratosComponent } from '../contratos/contratos.component';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'clientes',
  templateUrl: 'clientes.html',
  providers: [ClienteService, PlanService, PusherService]

})

export class ClientesComponent implements OnInit {

  // Lista de clientes
  public clientes: Cliente[];

  // Pagina actual de la lista
  public p: number = 1;

  @ViewChild(RegistroClienteComponent)
  public registroClienteComponent: RegistroClienteComponent;

  @ViewChild(ContratosComponent)
  public contratosComponent: ContratosComponent;

  // Lista de contratos de la tabla de contratos seleccionada
  public contratos: Contrato[] = [];

  // Canal de pusher
  private channel: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _planService: PlanService,
    private _pusherService: PusherService

  ) {

    // Solicitar clientes a backend
    this._clienteService.query().subscribe(
      Response => {

        this.clientes = Response;

        // Por cada cliente
        for (let i = 0; i < this.clientes.length; i++) {

          let cliente: Cliente = this.clientes[i];

          // Los contratos de cada cliente
          let contratos: Contrato[] = cliente.contratos;

          // Por cada contrato
          for (let j = 0; j < contratos.length; j++) {

            // El contrato debe contener su cliente
            contratos[j].contrato_historico.cliente = cliente;

          }

        }

      }, error => {
        console.log(<any>error);
      }
    );

    this.channel = this._pusherService.getPusher().subscribe('cliente');
    this.channel.bind('create', data => { this.onCreate(data) });
    this.channel.bind('update', data => { this.onUpdate(data) });
    this.channel.bind('delete', data => { this.onDelete(data) });
  }

  public ngOnInit() {
    //console.log('el componente cliente ha sido cargado');
  }

  public abrirContratos(contratos: Contrato[]) {
    this.contratos = contratos;
    this.contratosComponent.abrir();
  }

  public deleteCliente(id: number) {
    this._clienteService.delete(id).subscribe(null);
  }

  public onCreate(cliente: Cliente) {

    // Para los contratos del cliente
    let contratos: Contrato[] = cliente.contratos;

    // Si hay contratos
    if (contratos) {

      // Por cada contrato
      for (let i = 0; i < contratos.length; i++) {

        // Contrato debe contener al cliente
        contratos[i].contrato_historico.cliente = cliente;

      }

    }

    this.clientes.unshift(cliente);

  }

  public onUpdate(cliente: Cliente) {

    if (this.clientes) {

      // Para los contratos del cliente
      let contratos: Contrato[] = cliente.contratos;

      // Si hay contratos
      if (contratos) {

        // Por cada contrato
        for (let i = 0; i < contratos.length; i++) {

          // Contrato debe contener al cliente
          contratos[i].contrato_historico.cliente = cliente;

        }

      }

      for (let i = 0; i < this.clientes.length; i++) {

        if (this.clientes[i].id == cliente.id) {

          this.clientes[i] = cliente;
          break;

        }

      }

    }

  }

  public onDelete(id: number) {

    if (this.clientes) {

      for (let i = 0; i < this.clientes.length; i++) {

        if (this.clientes[i].id == id) {

          this.clientes.splice(i, 1);
          break;

        }

      }

    }

  }

}