import { Component, ViewChild, OnDestroy } from "@angular/core";
import { DisponibilidadHistoricaServicioService } from "../../../../services/disponibilidadhistoricaservicio.service";
import { DisponibilidadHistoricaServicio } from "../../../../models/DisponibilidadHistoricaServicio";
import { RegistroDisponibilidadServicioComponent } from "../registrodisponibilidadservicio/registrodisponibilidadservicio.component";
import { PusherService } from "../../../../services/pusher.service";
import { EliminarDisponibilidadServicioComponent } from "../eliminardisponibilidadservicio/eliminardisponibilidadservicio.component";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";

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

    // Lista de disponibilidades históricas de servicios
    public disponibilidadHistoricaServicios: DisponibilidadHistoricaServicio[];

    // Lista de disponibilidades de servicios
    public disponibilidadServicios: DisponibilidadServicio[];

    // Pagina actual
    public p1: number = 1;
    public p2: number = 1;

    // Canales de pusher
    public disponibilidadHistoricaServiciosChannel: any;
    public disponibilidadServiciosChannel: any;

    public constructor(
        private _disponibilidadHistoricaServiciosService: DisponibilidadHistoricaServicioService,
        private _disponibilidadServiciosService: DisponibilidadServicioService,
        private _pusherService: PusherService
    ) {
        // Obtener la disponibilidad histórica de servicios del backend
        this._disponibilidadHistoricaServiciosService.query().subscribe(
            Response => {
                this.disponibilidadHistoricaServicios = Response;
            }
        );

        // Obtener la disponibilidad de servicios del backend
        this._disponibilidadServiciosService.query().subscribe(
            Response => {
                this.disponibilidadServicios = Response;
            }
        );

        this.disponibilidadHistoricaServiciosChannel = this._pusherService.getPusher().subscribe("disponibilidadHistoricaServicio");
        this.disponibilidadHistoricaServiciosChannel.bind("create", data => { this.onCreateDisponibilidadServicioHistorica(new DisponibilidadHistoricaServicio(data)) });
        this.disponibilidadHistoricaServiciosChannel.bind("update", data => { this.onUpdateDisponibilidadServicioHistorica(new DisponibilidadHistoricaServicio(data)) });
        this.disponibilidadHistoricaServiciosChannel.bind("delete", data => { this.onDeleteDisponibilidadServicioHistorica(data) });

        this.disponibilidadServiciosChannel = this._pusherService.getPusher().subscribe("disponibilidadServicio");
        this.disponibilidadServiciosChannel.bind("create", data => { this.onCreateDisponibilidadServicio(new DisponibilidadServicio(data)) });
        this.disponibilidadServiciosChannel.bind("update", data => { this.onUpdateDisponibilidadServicio(new DisponibilidadServicio(data)) });
        this.disponibilidadServiciosChannel.bind("delete", data => { this.onDeleteDisponibilidadServicio(data) });

    }

    public ngOnDestroy() {
        if (this.disponibilidadHistoricaServiciosChannel) {
            this.disponibilidadHistoricaServiciosChannel.unbind();
        }
    }

    public registerDisponibilidadServicio() {
        this.registroDisponibilidadServicioComponent.abrir();
    }

    public deleteDisponibilidadServicio(disponibilidadServicio: DisponibilidadServicio) {
        this.eliminarDisponibilidadServicioComponent.abrir(disponibilidadServicio);
    }

    public onCreateDisponibilidadServicioHistorica(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios histórica
        if (this.disponibilidadHistoricaServicios) {
            // Agregar disponibilidad de servicio a la lista de disponibilidades de servicios
            this.disponibilidadHistoricaServicios.unshift(disponibilidadHistoricaServicio);

            // Indicar que se ha registrado la disponibilidad de servicio
            Materialize.toast('Se ha registrado una disponibilidad para el servicio "' + disponibilidadHistoricaServicio.servicio.ser_nombre + '" al sistema', 3000);
        }
    }

    public onUpdateDisponibilidadServicioHistorica(disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios histórica
        if (this.disponibilidadHistoricaServicios) {
            // Por cada disponibilidad de servicio
            for (let i = 0; i < this.disponibilidadHistoricaServicios.length; i++) {
                // Si los IDs coinciden
                if (this.disponibilidadHistoricaServicios[i].id == disponibilidadHistoricaServicio.id) {
                    // Reemplazar disponibilidad de servicio
                    this.disponibilidadHistoricaServicios[i] = disponibilidadHistoricaServicio;
                    break;
                }
            }
        }
    }

    public onDeleteDisponibilidadServicioHistorica(id: number) {
        // Si se ha recibido la lista de disponibilidad de servicios histórica
        if (this.disponibilidadHistoricaServicios) {
            // Por cada disponibilidad de servicio
            for (let i = 0; i < this.disponibilidadHistoricaServicios.length; i++) {
                // Si los IDs coinciden
                if (this.disponibilidadHistoricaServicios[i].id == id) {
                    // Eliminar disponibilidad de servicio
                    this.disponibilidadHistoricaServicios.splice(i, 1);
                    break;
                }
            }
        }
    }

    public onCreateDisponibilidadServicio(disponibilidadServicio: DisponibilidadServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios
        if (this.disponibilidadServicios) {
            // Agregar disponibilidad de servicio a la lista
            this.disponibilidadServicios.unshift(disponibilidadServicio);
        }
    }

    public onUpdateDisponibilidadServicio(disponibilidadServicio: DisponibilidadServicio) {
        // Si se ha recibido la lista de disponibilidad de servicios
        if (this.disponibilidadServicios) {
            // Por cada disponibilidad de servicio
            for (let i = 0; i < this.disponibilidadServicios.length; i++) {
                // Si los IDs coinciden
                if (this.disponibilidadServicios[i].id == disponibilidadServicio.id) {
                    // Actualizar disponibilidad de servicio
                    this.disponibilidadServicios[i] = disponibilidadServicio;
                    break;
                }
            }
        }
    }

    public onDeleteDisponibilidadServicio(id: number) {
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