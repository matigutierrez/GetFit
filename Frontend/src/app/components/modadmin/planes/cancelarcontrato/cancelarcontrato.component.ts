import { Component, EventEmitter } from "@angular/core";
import { MaterializeAction } from "angular2-materialize";
import { ContratoService } from "../../../../services/contrato.service";
import { Contrato } from "../../../../models/Contrato";

@Component({
    selector: 'cancelarcontrato',
    templateUrl: 'cancelarcontrato.html'
})
export class CancelarContratoComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Objeto del contrato
    private contrato: Contrato;

    public constructor(
        private _contratoService: ContratoService
    ) {

    }

    public abrir(contrato: Contrato) {
        this.contrato = contrato;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        this._contratoService.delete(this.contrato.id).subscribe(
            Response => {
                this.cerrar();
            }
        );
    }

}