import { Component } from "@angular/core";
import { ProfesorService } from "../../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { Profesor } from "../../../../models/Profesor";

@Component({
    selector: 'profesor',
    templateUrl: 'profesor.html'
})
export class ProfesorComponent {

    // 'id' del profesor
    public id: number;

    // Objeto del profesor
    public profesor: Profesor;

    public constructor(
        private _profesorService: ProfesorService,
        private _route: ActivatedRoute
    ) {

        // Solicitar el id del profesor
        this._route.params.subscribe(
            params => {
                this.id = params["id"];

                // Solicitar objeto del profesor
                this._profesorService.get(this.id).subscribe(
                    Response => {
                        this.profesor = Response;
                    }
                )
            }
        )

    }

}