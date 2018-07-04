import { Component, OnInit } from "@angular/core";
import { DisponibilidadHistoricaServicio } from "../../../../models/DisponibilidadHistoricaServicio";
import { ActivatedRoute } from "@angular/router";
import { DisponibilidadHistoricaServicioService } from "../../../../services/disponibilidadhistoricaservicio.service";

@Component({
    selector: 'disponibilidadservicio',
    templateUrl: 'disponibilidadservicio.html'
})
export class DisponibilidadServicioComponent implements OnInit {

    // El id de la disponibilidad de servicio
    public id: number;

    // La disponibilidad de servicio actual
    public disponibilidadHistoricaServicio: DisponibilidadHistoricaServicio;

    public constructor(
        private _disponibilidadHistoricaServicioService: DisponibilidadHistoricaServicioService,
        private _route: ActivatedRoute
    ) {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

    public ngOnInit() {
        this._disponibilidadHistoricaServicioService.get(this.id).subscribe(
            Response => {
                this.disponibilidadHistoricaServicio = Response;
            }
        );
    }

}