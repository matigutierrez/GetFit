import { Component, ViewChild, OnDestroy } from "@angular/core";
import { PusherService } from "../../../../services/pusher.service";
import { ServicioService } from "../../../../services/servicio.service";
import { Servicio } from "../../../../models/Servicio";
import { EliminarServicioComponent } from "../eliminarservicio/eliminarservicio.component";
import { RegistroServicioComponent } from "../registroservicio/registroservicio.component";

declare var Materialize: any;

@Component({
    selector: 'servicios',
    templateUrl: 'servicios.html'
})
export class ServiciosComponent implements OnDestroy {

    // Componente para registrar servicios
    @ViewChild(RegistroServicioComponent)
    public registroServicioComponent: RegistroServicioComponent;

    // Componente para eliminar servicios
    @ViewChild(EliminarServicioComponent)
    public eliminarServicioComponent: EliminarServicioComponent;

    // Lista de servicios disponibles
    public servicios: Servicio[];

    // Pagina actual del componente
    public p: number = 1;

    // Canal de servicios
    private servicioChannel: any;

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
        this.servicioChannel = this._pusherService.getPusher().subscribe("servicio");
        this.servicioChannel.bind("create", data => { this.onCreateServicio(new Servicio(data)) });
        this.servicioChannel.bind("update", data => { this.onUpdateServicio(new Servicio(data)) });
        this.servicioChannel.bind("delete", data => { this.onDeleteServicio(data) });

    }

    public ngOnDestroy() {
        if (this.servicioChannel) {
            this.servicioChannel.unbind();
        }
    }

    public onCreateServicio(servicio: Servicio) {
        // Si se ha recibido la lista de servicios
        if (this.servicios) {
            // Agregar servicio a la lista de servicios
            this.servicios.unshift(servicio);

            // Indicar que se ha creado un servicio
            Materialize.toast('Se ha registrado el servicio "' + servicio.ser_nombre + '" al sistema');
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
        this.registroServicioComponent.abrir();
    }

}