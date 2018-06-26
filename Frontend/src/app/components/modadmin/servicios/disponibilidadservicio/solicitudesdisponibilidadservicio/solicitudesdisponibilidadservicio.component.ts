import { Component, Input } from "@angular/core";
import { DisponibilidadServicio } from "../../../../../models/DisponibilidadServicio";
import { DisponibilidadServicioService } from "../../../../../services/disponibilidadservicio.service";
import { SolicitudServicioHistorica } from "../../../../../models/SolicitudServicioHistorica";
import { SolicitudServicio } from "../../../../../models/SolicitudServicio";

@Component({
    selector: 'solicitudesdisponibilidadservicio',
    templateUrl: 'solicitudesdisponibilidadservicio.html',
    styleUrls: ['solicitudesdisponibilidadservicio.css']
})
export class SolicitudesDisponibilidadServicioComponent {

    // Disponibilidad de servicio a trabajar
    public disponibilidadServicio: DisponibilidadServicio;

    // Solicitudes de servicio actuales
    public solicitudesServicio: SolicitudServicio[];

    // Solicitudes de servicio historicas
    public solicitudesServicioHistoricas: SolicitudServicioHistorica[];

    // Paginaciones
    public p1: number = 1;
    public p2: number = 1;

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService
    ) {

    }

    public deleteSolicitudServicio(solicitudServicio: SolicitudServicio) {

    }

    @Input("disponibilidadServicio")
    public set setDisponibilidadServicio(disponibilidadServicio: DisponibilidadServicio) {
        // Cachear disponibilidad de servicio
        this.disponibilidadServicio = disponibilidadServicio;
        
        // Obtener solicitudes historicas
        this._disponibilidadServicioService.getSolicitudesHistoricas(this.disponibilidadServicio).subscribe(
            Response => {
                this.solicitudesServicioHistoricas = Response;
            }
        );

        // Obtener solicitudes actuales
        this._disponibilidadServicioService.getSolicitudes(this.disponibilidadServicio).subscribe(
            Response => {
                this.solicitudesServicio = Response;
            }
        );
    }
    
}