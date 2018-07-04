import { Component, EventEmitter } from "@angular/core";
import { CobranzaService } from "../../../../services/cobranza.service";
import { Cobranza } from "../../../../models/Cobranza";
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'eliminarcobranza',
    templateUrl: 'eliminarcobranza.html'
})
export class EliminarCobranzaComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Cobranza a eliminar
    public cobranza: Cobranza;

    // Indicar que se encuentra eliminando
    public eliminando: boolean;

    public constructor(
        private _cobranzaService: CobranzaService
    ) {

    }

    public abrir(cobranza: Cobranza) {
        this.cobranza = cobranza;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando la cobranza
        this.eliminando = true;

        this._cobranzaService.delete(this.cobranza.id).subscribe(
            Response => {
                // Cerrar componente
                this.cerrar();
            }
        );
    }

}