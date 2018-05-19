import { Component, EventEmitter, Input } from "@angular/core";
import { MaterializeAction } from "angular2-materialize";
import { Contrato } from "../../../../models/Contrato";

@Component({
    selector: 'contratos',
    templateUrl: 'contratos.html'
})
export class ContratosComponent {

    // Modal del componente
    public modal = new EventEmitter<string|MaterializeAction>();

    // Lista de contratos
    public contratos: Contrato[];

    public constructor() {

    }

    @Input("contratos")
    public set setContratos(contratos: Contrato[]) {
        this.contratos = contratos;
    }

    public abrir(): void {
        this.modal.emit({ action: "modal", params: ["open"] });
    }

    public cerrar(): void {
        this.modal.emit({ action: "modal", params: ["close"] });
    }

}