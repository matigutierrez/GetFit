import { Component, EventEmitter, OnInit, Input, Output, AfterViewChecked } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/Cliente';
import { Plan } from '../../../../models/Plan';
import { Usuario } from '../../../../models/Usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { Rol } from '../../../../models/Rol';
import { RolService } from '../../../../services/rol.service';
declare var $:any;
declare var jQuery:any;

declare var Materialize: any;

@Component({
  selector: 'registrocliente',
  templateUrl: 'registrocliente.html',
  providers: [ClienteService, UsuarioService, RolService]
})

export class RegistroClienteComponent implements OnInit, AfterViewChecked {

  public cliente: Cliente;
  public usuario: Usuario;
  public rol: Rol[];

  public modalRegistroCliente = new EventEmitter<string|MaterializeAction>();

  public constructor(
    private _clienteService: ClienteService,
    private _usuarioService: UsuarioService,
    private _rolService: RolService
  ){

    this.cliente = new Cliente();
    this.usuario = new Usuario();

    // Solicitar roles a base de datos
    this._rolService.query().subscribe(
      Response => {
        this.rol = Response;
      }
    );

  }

  public ngOnInit(){
    //console.log('el componente registro-cliente ha sido cargado');
  }

  public ngAfterViewChecked() {
    if ( Materialize.updateTextFields ) {
      Materialize.updateTextFields();
    }
  }

  public onSubmit(){
    this._clienteService.save(this.cliente).subscribe(
      Response => {

        // Insertar dato al registro de clientes
        this.cliente.id = Response;

        if ( this.usuario.usu_correo.length > 0 && this.usuario.password.length > 0 ) {

          this.usuario.tgf_cliente_id = this.cliente.id;
          this._usuarioService.save(this.usuario).subscribe(null);

        }
        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  public abrir() {
    this.modalRegistroCliente.emit({ action:"modal", params:['open'] });
  }

  public cerrar() {
    this.modalRegistroCliente.emit({ action:"modal", params:['close'] });
  }
  
}