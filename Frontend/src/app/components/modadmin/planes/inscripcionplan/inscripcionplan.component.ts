import { Component, Input } from "@angular/core";
import { Cliente } from "../../../../models/Cliente";
import { ClienteService } from "../../../../services/cliente.service";

import * as $ from 'jquery';

@Component({
    selector: 'inscripcionplan',
    templateUrl: 'inscripcionplan.html',
    providers: [ClienteService]
})
export class InscripcionPlanComponent {

    @Input()
    public plan_id: number;

    private clientes: Cliente[];
    private clientesMap: any;

    private autocomplete: any;
    private clienteSeleccionado: Cliente;
    
    public constructor(
        private _clienteService: ClienteService
    ) {

        this.autocomplete = {
            data: {},
            onAutocomplete: (nombre:string) => this.select(nombre)
        };
        
        this._clienteService.query().subscribe(
            Response => {
                this.clientes = Response;
                this.autocomplete.data = {};

                for (let i = 0; i < this.clientes.length; i++) {
                    let cliente: Cliente = this.clientes[i];
                    this.autocomplete.data[cliente.cli_nombres + " " + cliente.cli_apellidos] = cliente;
                }
            },
            error => {
                console.error(error);
            }
        );
        
    }

    public select(nombre:string) {
        this.clienteSeleccionado = this.autocomplete.data[nombre];
    }

    public inscribir() {
        // Inscribir al cliente: this.clienteSeleccionado
    }

}