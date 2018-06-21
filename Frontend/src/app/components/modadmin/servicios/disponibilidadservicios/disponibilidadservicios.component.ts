import { Component, ViewChild, OnDestroy } from "@angular/core";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";
import { RegistroDisponibilidadServicioComponent } from "../registrodisponibilidadservicio/registrodisponibilidadservicio.component";
import { PusherService } from "../../../../services/pusher.service";
import { EliminarDisponibilidadServicioComponent } from "../eliminardisponibilidadservicio/eliminardisponibilidadservicio.component";

declare var Materialize: any;

@Component({
    selector: 'disponibilidadservicios',
    templateUrl: 'disponibilidadservicios.html'
})
export class DisponibilidadServiciosComponent implements OnDestroy {

    // Componente para eliminar la disponibilidad de servicio
    @ViewChild(EliminarDisponibilidadServicioComponent)
    public eliminarDisponibilidadServicioComponent: EliminarDisponibilidadServicioComponent;

    // Componente para registro de disponibilidad de servicio
    @ViewChild(RegistroDisponibilidadServicioComponent)
    public registroDisponibilidadServicioComponent: RegistroDisponibilidadServicioComponent;

    // Lista de disponibilidad de servicios
    public disponibilidadServicios: DisponibilidadServicio[];

    // Pagina actual
    public p: number = 1;

    // Canal de pusher
    public disponibilidadServiciosChannel: any;

    public constructor(
        private _disponibilidadServiciosService: DisponibilidadServicioService,
        private _pusherService: PusherService
    ) {
        // Obtener la disponibilidad de servicios del backend
        this._disponibilidadServiciosService.query().subscribe(
            Response => {
                this.disponibilidadServicios = Response;
            }
        );

        this.disponibilidadServiciosChannel = this._pusherService.getPusher().subscribe("disponibilidadServicio");
        this.disponibilidadServiciosChannel.bind("create", data => { this.onCreate(new DisponibilidadServicio(data)) });
        this.disponibilidadServiciosChannel.bind("update", data => { this.onUpdate(new DisponibilidadServicio(data)) });
        this.disponibilidadServiciosChannel.bind("delete", data => { this.onDelete(data) });

    }

    public ngOnDestroy() {
        if (this.disponibilidadServiciosChannel) {
            this.disponibilidadServiciosChannel.unbind();
        }
    }

    public registerDisponibilidadServicio() {
        this.registroDisponibilidadServicioComponent.abrir();
    }

    public deleteDisponibilidadServicio(disponibilidadServicio: DisponibilidadServicio) {
        this.eliminarDisponibilidadServicioComponent.abrir(disponibilidadServicio);
    }

    public onCreate(disponibilidadServicio: DisponibilidadServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios
        if (this.disponibilidadServicios) {
            // Agregar disponibilidad de servicio a la lista de disponibilidades de servicios
            this.disponibilidadServicios.unshift(disponibilidadServicio);

            // Indicar que se ha registrado la disponibilidad de servicio
            Materialize.toast('Se ha registrado una disponibilidad para el servicio "' + disponibilidadServicio.servicio.ser_nombre + '" al sistema', 3000);
        }
    }

    public onUpdate(disponibilidadServicio: DisponibilidadServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios
        if (this.disponibilidadServicios) {
            // Por cada disponibilidad de servicio
            for (let i = 0; i < this.disponibilidadServicios.length; i++) {
                // Si los IDs coinciden
                if (this.disponibilidadServicios[i].id == disponibilidadServicio.id) {
                    // Reemplazar disponibilidad de servicio
                    this.disponibilidadServicios[i] = disponibilidadServicio;
                    break;
                }
            }
        }
    }

    public onDelete(id: number) {
        // Si se ha recibido la lista de disponibilidad de servicios
        if (this.disponibilidadServicios) {
            // Por cada disponibilidad de servicio
            for (let i = 0; i < this.disponibilidadServicios.length; i++) {
                // Si los IDs coinciden
                if (this.disponibilidadServicios[i].id == id) {
                    // Eliminar disponibilidad de servicio
                    this.disponibilidadServicios.splice(i, 1);
                    break;
                }
            }
        }
    }

}