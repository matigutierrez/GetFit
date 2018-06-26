import { Component, OnInit } from "@angular/core";
import { DisponibilidadServicio } from "../../../../models/DisponibilidadServicio";
import { ActivatedRoute } from "@angular/router";
import { DisponibilidadServicioService } from "../../../../services/disponibilidadservicio.service";

@Component({
    selector: 'disponibilidadservicio',
    templateUrl: 'disponibilidadservicio.html'
})
export class DisponibilidadServicioComponent implements OnInit {

    // El id de la disponibilidad de servicio
    public id: number;

    // La disponibilidad de servicio actual
    public disponibilidadServicio: DisponibilidadServicio;

    public constructor(
        private _disponibilidadServicioService: DisponibilidadServicioService,
        private _route: ActivatedRoute
    ) {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

    public ngOnInit() {
        this._disponibilidadServicioService.get(this.id).subscribe(
            Response => {
                this.disponibilidadServicio = Response;
            }
        );
    }

}