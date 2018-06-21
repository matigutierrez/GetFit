import { Component, EventEmitter } from "@angular/core";
import { ClienteService } from "../../../../services/cliente.service";
import { Cliente } from "../../../../models/Cliente";
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'eliminarcliente',
    templateUrl: 'eliminarcliente.html'
})
export class EliminarClienteComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Cliente a eliminar
    public cliente: Cliente;

    // Indicar que se encuentra eliminando el cliente
    public eliminando: boolean;

    public constructor(
        private _clienteService: ClienteService
    ) {

    }

    public abrir(cliente: Cliente) {
        this.cliente = cliente;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando el cliente
        this.eliminando = true;

        // Eliminar el cliente
        this._clienteService.delete(this.cliente.id).subscribe(
            Response => {
                // Cerrar modal
                this.cerrar();
            }
        );
    }

}