import { Component, Input } from "@angular/core";
import { DisponibilidadHistoricaServicio } from "../../../../../models/DisponibilidadHistoricaServicio";
import { DisponibilidadHistoricaServicioService } from "../../../../../services/disponibilidadhistoricaservicio.service";
import { SolicitudServicioHistorica } from "../../../../../models/SolicitudServicioHistorica";
import { SolicitudServicio } from "../../../../../models/SolicitudServicio";

@Component({
    selector: 'solicitudesdisponibilidadservicio',
    templateUrl: 'solicitudesdisponibilidadservicio.html',
    styleUrls: ['solicitudesdisponibilidadservicio.css']
})
export class SolicitudesDisponibilidadServicioComponent {

    // Disponibilidad de servicio a trabajar
    public disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio;

    // Solicitudes de servicio actuales
    public solicitudesServicio: SolicitudServicio[];

    // Solicitudes de servicio historicas
    public solicitudesServicioHistoricas: SolicitudServicioHistorica[];

    // Paginaciones
    public p1: number = 1;
    public p2: number = 1;

    public constructor(
        private _disponibilidadHistoricaServicioService: DisponibilidadHistoricaServicioService
    ) {

    }

    public deleteSolicitudServicio(solicitudServicio: SolicitudServicio) {

    }

    @Input("disponibilidadHistoricaServicio")
    public set setDisponibilidadServicio(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio) {
        // Cachear disponibilidad de servicio
        this.disponibilidadHistoricaServicio = disponibilidadHistoricaServicio;
        
        // Obtener solicitudes historicas
        this._disponibilidadHistoricaServicioService.getSolicitudesHistoricas(this.disponibilidadHistoricaServicio).subscribe(
            Response => {
                this.solicitudesServicioHistoricas = Response;
            }
        );

        // Obtener solicitudes actuales
        this._disponibilidadHistoricaServicioService.getSolicitudes(this.disponibilidadHistoricaServicio).subscribe(
            Response => {
                this.solicitudesServicio = Response;
            }
        );
    }
    
}