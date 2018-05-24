import { Component, Input, AfterViewChecked } from "@angular/core";
import { Cliente } from "../../../../models/Cliente";
import { Usuario } from "../../../../models/Usuario";
import { ClienteService } from "../../../../services/cliente.service";
import { UsuarioService } from "../../../../services/usuario.service";

declare var Materialize: any;

@Component({
    selector: 'editarcliente',
    templateUrl: 'editarcliente.html'
})
export class EditarClienteComponent implements AfterViewChecked {

    // Objeto del cliente
    public cliente: Cliente = new Cliente();

    // Objeto del usuario
    public usuario: Usuario = new Usuario();

    // Bloqueo de boton
    public editandoCliente: boolean;
    public editandoUsuario: boolean;

    public constructor(
        private _clienteService: ClienteService,
        private _usuarioService: UsuarioService
    ) {

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    @Input("cliente")
    public set setCliente(cliente: Cliente) {

        this.cliente = cliente;

        if ( this.cliente.usuario ) {
            this.usuario = this.cliente.usuario;
        } else {
            this.usuario = new Usuario();
            this.usuario.tgf_cliente_id = this.cliente.id;

            // Rol del cliente
            this.usuario.tgf_rol_id = 3;
        }
        
    }

    public onSubmit() {
        // Indicar que se está editando el cliente
        this.editandoCliente = true;

        // Guardar el cliente
        this._clienteService.update(this.cliente).subscribe(
            Response => {
                this.editandoCliente = false;
            }
        );

        if ( this.usuario.usu_correo.length > 0 ) {
            // Indicar que se está modificando el usuario
            this.editandoUsuario = true;

            // Si la longitud del nombre del usuario es mayor que cero, asignar un usuario
            if ( this.usuario.id ) {
                // Si hay un usuario asignado, actualizar el usuario
                this._usuarioService.update(this.usuario).subscribe(
                    Response => {
                        this.editandoUsuario = false;
                    },
                    error => {
                        this.editandoUsuario = false;
                    }
                );

            } else {
                // Si no hay un usuario asignado, crear el usuario
                this._usuarioService.save(this.usuario).subscribe(
                    Response => {
                        // Guardar id de usuario
                        this.usuario.id = Response;
                        this.editandoUsuario = false;
                    },
                    error => {
                        this.editandoUsuario = false;
                    }
                );
            }

        } else {
            // Si la longitud del nombre del usuario es cero, quitar usuario
            if ( this.usuario.id ) {
                // Indicar que se está editando el usuario
                this.editandoUsuario = true;

                // Si hay un usuario asignado, eliminar el usuario
                this._usuarioService.delete(this.usuario.id).subscribe(
                    Response => {
                        this.editandoUsuario = false;

                        // En caso que se desee crear un nuevo cliente
                        this.usuario = new Usuario();
                        this.usuario.tgf_cliente_id = this.cliente.id;
                        this.usuario.tgf_rol_id = 3;
                    },
                    error => {
                        this.editandoUsuario = false;
                    }
                );

            }
        }
    }

}