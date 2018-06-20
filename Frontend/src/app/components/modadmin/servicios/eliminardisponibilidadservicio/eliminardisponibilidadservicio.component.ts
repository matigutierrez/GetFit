import { Component, EventEmitter } from "@angular/core";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'eliminardisponibilidadservicio',
    templateUrl: 'eliminardisponibilidadservicio.html'
})
export class EliminarDisponibilidadServicioComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Disponibilidad de servicio a eliminar
    public disponibilidadServicio: DisponibilidadServicio;

    // Indicar que se está eliminando la disponibilidad de servicio
    public eliminando: boolean;

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService
    ) {

    }

    public abrir(servicio: DisponibilidadServicio) {
        this.disponibilidadServicio = servicio;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando la disponibilidad de servicio
        this.eliminando = true;

        // Eliminar la disponibilidad de servicio
        this._disponibilidadServicioService.delete(this.disponibilidadServicio.id).subscribe(
            Response => {
                // Cerrar modal
                this.cerrar();
            }
        );
    }

}