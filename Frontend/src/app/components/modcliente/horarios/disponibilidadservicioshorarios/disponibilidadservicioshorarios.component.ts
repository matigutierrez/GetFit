import { Component } from "@angular/core";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";

@Component({
    selector: 'disponibilidadservicioshorarios',
    templateUrl: 'disponibilidadservicioshorarios.html',
    styleUrls: ['disponibilidadservicioshorarios.css']
})
export class DisponibilidadServiciosHorariosComponent {

    // Lista de servicios disponibles
    public disponibilidadServicios: DisponibilidadServicio[];

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService
    ) {
        // Solicitar servicios disponibles a backend
        this._disponibilidadServicioService.query().subscribe(
            Response => {
                this.disponibilidadServicios = Response;
            }
        );
    }

}