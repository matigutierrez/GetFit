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
        }
        
    }

    public onSubmit() {

    }

}