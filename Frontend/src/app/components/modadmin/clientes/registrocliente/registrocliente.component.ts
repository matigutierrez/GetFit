import { Component, EventEmitter, AfterViewChecked } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from '../../../../models/Cliente';
import { Usuario } from '../../../../models/Usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { Rol } from '../../../../models/Rol';
import { RolService } from '../../../../services/rol.service';

declare var Materialize: any;

@Component({
    selector: 'registrocliente',
    templateUrl: 'registrocliente.html'
})

export class RegistroClienteComponent implements AfterViewChecked {

    public cliente: Cliente;
    public usuario: Usuario;
    public rol: Rol[];

    public modal = new EventEmitter<string | MaterializeAction>();

    public constructor(
        private _clienteService: ClienteService,
        private _usuarioService: UsuarioService,
        private _rolService: RolService
    ) {

        this.cliente = new Cliente();
        this.usuario = new Usuario();

        // El usuario debe tener rol de cliente
        this.usuario.tgf_rol_id = 3;

        // Solicitar roles a base de datos
        this._rolService.query().subscribe(
            Response => {
                this.rol = Response;
            }
        );

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar(): void {
        this.cliente = new Cliente();
        this.usuario = new Usuario();

        // El usuario debe tener rol de cliente
        this.usuario.tgf_rol_id = 3;
    }

    public onSubmit() {
        this._clienteService.save(this.cliente).subscribe(
            Response => {

                // Insertar dato al registro de clientes
                this.cliente.id = Response;

                // Si el usuarioa  registrar es válido
                if (this.usuario.usu_correo.length > 0 && this.usuario.password.length > 0) {

                    // Fijar el id del cliente para el usuario
                    this.usuario.tgf_cliente_id = this.cliente.id;

                    // Guardar usuario
                    this._usuarioService.save(this.usuario).subscribe(null);

                }

                // Cerrar formulario
                this.cerrar();

                // Limpiar formulario
                this.limpiar();

            }
        );
    }

    public abrir() {
        // Limpiar formulario
        this.limpiar();

        // Abrir modal
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

}