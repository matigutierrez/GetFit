import { Component } from "@angular/core";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";

@Component({
    selector: 'contratoshorarios',
    templateUrl: 'contratoshorarios.html',
    styleUrls: ['contratoshorarios.css']
})
export class ContratosHorariosComponent {

    // Lista de contratos
    public contratos: Contrato[];

    public constructor(
        private _contratoService: ContratoService
    ) {
        // Solicitar contratos de cliente a backend
        this._contratoService.queryToken().subscribe(
            Response => {
                this.contratos = Response;
            }
        );
    }

}