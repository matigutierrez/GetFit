import { Component, ViewChild } from "@angular/core";
import { PusherService } from "../../../../services/pusher.service";
import { ServicioService } from "../../../../services/servicio.service";
import { Servicio } from "../../../../models/Servicio";
import { EliminarServicioComponent } from "../eliminarservicio/eliminarservicio.component";

@Component({
    selector: 'servicios',
    templateUrl: 'servicios.html'
})
export class ServiciosComponent {

    // Componente para eliminar servicios
    @ViewChild(EliminarServicioComponent)
    public eliminarServicioComponent: EliminarServicioComponent;

    // Lista de servicios disponibles
    public servicios: Servicio[];

    // Pagina actual del componente
    public p: number = 1;

    // Canal de servicios
    private serviceChannel: any;

    public constructor(
        private _servicioService: ServicioService,
        private _pusherService: PusherService
    ) {

        // Obtener la lista de servicios
        this._servicioService.query().subscribe(
            Response => {
                this.servicios = Response;
            }
        );

        // Suscribirse a canal de pusher
        this.serviceChannel = this._pusherService.getPusher().subscribe("servicio");
        this.serviceChannel.bind("create", data => { this.onCreateServicio(new Servicio(data)) });
        this.serviceChannel.bind("update", data => { this.onUpdateServicio(new Servicio(data)) });
        this.serviceChannel.bind("delete", data => { this.onDeleteServicio(data) });

    }

    public onCreateServicio(servicio: Servicio) {
        // Si se ha recibido la lista de servicios
        if (this.servicios) {
            // Agregar servicio a la lista de servicios
            this.servicios.unshift(servicio);
        }
    }

    public onUpdateServicio(servicio: Servicio) {
        // Si se ha recibido la lista de servicios
        if (this.servicios) {
            // Por cada servicio
            for (let i = 0; i < this.servicios.length; i++) {
                // Comparar IDs
                if (this.servicios[i].id == servicio.id) {
                    // Reemplazar servicio
                    this.servicios[i] = servicio;
                    break;
                }
            }
        }
    }

    public onDeleteServicio(id: number) {
        // Si se ha recibido la lista de servicios
        if (this.servicios) {
            // Por cada servicio
            for (let i = 0; i < this.servicios.length; i++) {
                // Comparar IDs
                if (this.servicios[i].id == id) {
                    // Eliminar servicio
                    this.servicios.splice(i, 1);
                    break;
                }
            }
        }
    }

    public deleteServicio(servicio: Servicio) {
        this.eliminarServicioComponent.abrir(servicio);
    }

    public registerServicio() {
        
    }

}