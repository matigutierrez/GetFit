import { Component, EventEmitter, AfterViewChecked } from "@angular/core";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";
import { MaterializeAction } from "angular2-materialize";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";
import { Servicio } from "../../../../models/Servicio";
import { ServicioService } from "../../../../services/servicio.service";

declare var Materialize: any;

@Component({
    selector: 'registrodisponibilidadservicio',
    templateUrl: 'registrodisponibilidadservicio.html'
})
export class RegistroDisponibilidadServicioComponent implements AfterViewChecked {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Disponibilidad de servicio que se creará
    public disponibilidadServicio: DisponibilidadServicio = new DisponibilidadServicio();

    // Indicar que se encuentra registrando el servicio
    public registrando: boolean;

    // Lista de servicios
    public servicios: Servicio[];

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService,
        private _servicioService: ServicioService
    ) {
        // Obtener lista de servicios del backend
        this._servicioService.query().subscribe(
            Response => {
                this.servicios = Response;
            }
        );

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar() {
        this.disponibilidadServicio = new DisponibilidadServicio();
        this.registrando = false;
    }

    public abrir() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.limpiar();
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onChangeFechaInicio(event: any): void {
        this.disponibilidadServicio.dse_fecha_inicio = new Date(event.target.value);
    }

    public onChangeFechaTermino(event: any): void {
        this.disponibilidadServicio.dse_fecha_fin = new Date(event.target.value);
    }

    public onSubmit() {
        if (this.disponibilidadServicio.dse_fecha_inicio != null && this.disponibilidadServicio.dse_fecha_fin != null && this.disponibilidadServicio.tgf_servicio_id != null) {
            // Indicar que se encuentra registrando la disponibilidad de servicio
            this.registrando = true;
            
            this._disponibilidadServicioService.save(this.disponibilidadServicio).subscribe(
                Response => {
                    // Cerrar modal
                    this.cerrar();
                }
            );
        }
    }

}