import { Component, EventEmitter, AfterViewChecked } from "@angular/core";
import { DisponibilidadHistoricaServicio } from "../../../../models/DisponibilidadHistoricaServicio";
import { MaterializeAction } from "angular2-materialize";
import { DisponibilidadHistoricaServicioService } from "../../../../services/disponibilidadhistoricaservicio.service";
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
    public disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio = new DisponibilidadHistoricaServicio();

    // Indicar que se encuentra registrando el servicio
    public registrando: boolean;

    // Lista de servicios
    public servicios: Servicio[];

    public constructor(
        private _disponibilidadHistoricaServicioService: DisponibilidadHistoricaServicioService,
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
        this.disponibilidadHistoricaServicio = new DisponibilidadHistoricaServicio();
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
        this.disponibilidadHistoricaServicio.dse_fecha_inicio = new Date(event.target.value);
    }

    public onChangeFechaTermino(event: any): void {
        this.disponibilidadHistoricaServicio.dse_fecha_fin = new Date(event.target.value);
    }

    public onSubmit() {
        if (this.disponibilidadHistoricaServicio.dse_fecha_inicio != null && this.disponibilidadHistoricaServicio.dse_fecha_fin != null && this.disponibilidadHistoricaServicio.tgf_servicio_id != null) {
            // Indicar que se encuentra registrando la disponibilidad de servicio
            this.registrando = true;
            
            this._disponibilidadHistoricaServicioService.save(this.disponibilidadHistoricaServicio).subscribe(
                Response => {
                    // Cerrar modal
                    this.cerrar();
                }
            );
        }
    }

}