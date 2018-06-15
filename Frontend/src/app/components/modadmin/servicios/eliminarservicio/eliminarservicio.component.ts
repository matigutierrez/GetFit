import { Component, EventEmitter } from "@angular/core";
import { MaterializeAction } from "angular2-materialize";
import { ServicioService } from "../../../../services/servicio.service";
import { Servicio } from "../../../../models/Servicio";

@Component({
    selector: 'eliminarservicio',
    templateUrl: 'eliminarservicio.html'
})
export class EliminarServicioComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Servicio a eliminar
    public servicio: Servicio;

    // Indicar que se está eliminando un servicio
    public eliminando: boolean;

    public constructor(
        private _servicioService: ServicioService
    ) {

    }

    public abrir(servicio: Servicio) {
        this.servicio = servicio;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando el servicio
        this.eliminando = true;

        // Eliminar el servicio
        this._servicioService.delete(this.servicio.id).subscribe(
            Response => {
                // Cerrar modal
                this.cerrar();
            }
        );
    }

}