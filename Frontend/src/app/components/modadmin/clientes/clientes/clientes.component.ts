import { Component, OnInit, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/Cliente';
import { PlanService } from '../../../../services/plan.service';
import { PusherService } from '../../../../services/pusher.service';
import { RegistroClienteComponent } from '../registrocliente/registrocliente.component';
import { Contrato } from '../../../../models/Contrato';
import { ContratosComponent } from '../contratos/contratos.component';
import { Usuario } from '../../../../models/Usuario';

@Component({
  selector: 'clientes',
  templateUrl: 'clientes.html',
  providers: [ClienteService, PlanService, PusherService]

})

export class ClientesComponent implements OnInit, OnDestroy {

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

  // Canal de clientes
  private clienteChannel: any;

  // Canal de usuarios
  private usuarioChannel: any;

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

    this.clienteChannel = this._pusherService.getPusher().subscribe('cliente');
    this.clienteChannel.bind('create', data => { this.onCreateCliente(data) });
    this.clienteChannel.bind('update', data => { this.onUpdateCliente(data) });
    this.clienteChannel.bind('delete', data => { this.onDeleteCliente(data) });

    this.usuarioChannel = this._pusherService.getPusher().subscribe('usuario');
    this.usuarioChannel.bind('create', data => { this.onCreateUsuario(data) });
    this.usuarioChannel.bind('update', data => { this.onUpdateUsuario(data) });
    this.usuarioChannel.bind('delete', data => { this.onDeleteUsuario(data) });

  }

  public ngOnDestroy() {
    if (this.clienteChannel) {
      this.clienteChannel.unbind();
    }
    if (this.usuarioChannel) {
      this.usuarioChannel.unbind();
    }
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

  public onCreateCliente(cliente: Cliente) {
    // Si se ha recibido la lista de clientes
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

      // Agregar cliente nuevo a la lista
      this.clientes.unshift(cliente);
    }

  }

  public onUpdateCliente(cliente: Cliente) {

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

      // Para cada cliente
      for (let i = 0; i < this.clientes.length; i++) {

        // Si los IDs coinciden
        if (this.clientes[i].id == cliente.id) {

          // Actualizar cliente
          this.clientes[i] = cliente;
          break;

        }

      }

    }

  }

  public onDeleteCliente(id: number) {
    // Si se ha recibido la lista de clientes
    if (this.clientes) {
      // Por cada cliente
      for (let i = 0; i < this.clientes.length; i++) {
        // Si los IDs coinciden
        if (this.clientes[i].id == id) {
          // Quitar cliente de la lista
          this.clientes.splice(i, 1);
          break;

        }

      }

    }

  }

  public onCreateUsuario(usuario: Usuario) {
    // Si se ha recibido la lista de clientes
    if ( this.clientes ) {
      // Por cada cliente
      for (let i = 0; i < this.clientes.length; i++) {

        let cliente: Cliente = this.clientes[i];

        // Si los IDs coinciden
        if (usuario.tgf_cliente_id == cliente.id) {
          // Cliente debe contener al usuario
          cliente.usuario = usuario;

        }

      }

    }

  }

  public onUpdateUsuario(usuario: Usuario) {
    // Si se ha recibido la lista de clientes
    if ( this.clientes ) {
      // Por cada cliente
      for (let i = 0; i < this.clientes.length; i++) {

        let cliente: Cliente = this.clientes[i];

        // Si los IDs coinciden
        if (usuario.tgf_cliente_id == cliente.id) {
          // Cliente debe contener al usuario
          cliente.usuario = usuario;

        }

      }

    }

  }

  public onDeleteUsuario(id: number) {
    // Si se ha recibido la lista de clientes
    if ( this.clientes ) {
      // Por cada cliente
      for (let i = 0; i < this.clientes.length; i++) {

        let cliente: Cliente = this.clientes[i];

        // Si el cliente tiene usuario
        if ( cliente.usuario != null ) {

          // Si los IDs coinciden
          if (cliente.usuario.id == id ) {
            // Quitar usuario a cliente
            cliente.usuario = null;

          }

        }

      }

    }
  }

}