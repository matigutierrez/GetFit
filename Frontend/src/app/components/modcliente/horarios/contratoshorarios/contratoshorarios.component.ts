import { Component } from "@angular/core";
import { ClienteService } from "../../../../services/cliente.service";

@Component({
    selector: 'contratoshorarios',
    templateUrl: 'contratoshorarios.html'
})
export class ContratosHorariosComponent {

    public constructor(
        private _clienteService: ClienteService
    ) {

    }

}