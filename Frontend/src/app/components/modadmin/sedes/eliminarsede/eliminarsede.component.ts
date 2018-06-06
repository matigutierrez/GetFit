import { Component, EventEmitter } from "@angular/core";
import { SedeService } from "../../../../services/sede.service";
import { MaterializeAction } from "angular2-materialize";
import { Sede } from "../../../../models/Sede";

@Component({
    selector: 'eliminarsede',
    templateUrl: 'eliminarsede.html'
})
export class EliminarSedeComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Sede a eliminar
    public sede: Sede;

    // Indicar que se encuentra eliminando la sede
    public eliminando: boolean;

    public constructor(
        private _sedeService: SedeService
    ) {

    }

    public abrir(sede: Sede) {
        this.sede = sede;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando la sede
        this.eliminando = true;

        // Eliminar la sede
        this._sedeService.delete(this.sede.id).subscribe(
            Response => {
                // Cerrar modal
                this.cerrar();
            }
        );
    }

}