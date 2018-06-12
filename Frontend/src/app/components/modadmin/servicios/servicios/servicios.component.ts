import { Component } from "@angular/core";
import { ServicioService } from "../../../../services/servicio.service";
import { Servicio } from "../../../../models/Servicio";

@Component({
    selector: 'servicios',
    templateUrl: 'servicios.html'
})
export class ServiciosComponent {

    // Lista de servicios disponibles
    public servicios: Servicio[];

    // Pagina actual del componente
    public p: number = 1;

    public constructor(
        private _servicioService: ServicioService
    ) {

        this._servicioService.query().subscribe(
            Response => {
                this.servicios = Response;
            }
        );

    }

    public deleteServicio(servicio: Servicio) {

    }

    public registerServicio() {
        
    }

}