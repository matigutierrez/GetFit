import { Component, ViewChild } from "@angular/core";
import { ClienteService } from "../../../../services/cliente.service";
import { ActivatedRoute } from "@angular/router";
import { Cliente } from "../../../../models/Cliente";

@Component({
    selector: 'cliente',
    templateUrl: 'cliente.html'
})
export class ClienteComponent {

    // 'id' del cliente actual
    public id: number;

    // Objeto del cliente
    public cliente: Cliente;

    public constructor(
        private _clienteService: ClienteService,
        private _route: ActivatedRoute
    ) {

        // Esperar a recibir el id del cliente
        this._route.params.subscribe(params => {
            this.id = params["id"];

            // Solicitar cliente a backend
            this._clienteService.get(this.id).subscribe(
                Response => {
                    this.cliente = Response;
                }
            )

        });

    }

}