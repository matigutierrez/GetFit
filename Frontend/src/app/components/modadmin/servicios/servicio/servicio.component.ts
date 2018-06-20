import { Component } from "@angular/core";
import { ServicioService } from "../../../../services/servicio.service";
import { ActivatedRoute } from "@angular/router";
import { Servicio } from "../../../../models/Servicio";

@Component({
    selector: 'servicio',
    templateUrl: 'servicio.html'
})
export class ServicioComponent {

    // Id del servicio
    public id: number;

    // Objeto del servicio
    public servicio: Servicio;

    public constructor(
        private _servicioService: ServicioService,
        private _route: ActivatedRoute
    ) {

        this._route.params.subscribe(params => {
            this.id = params["id"];
        });

    }

    public ngOnInit() {
        // Solicitar servicio a backend
        this._servicioService.get(this.id).subscribe(
            Response => {
                this.servicio = Response;
            }
        )
    }

}