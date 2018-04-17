import { Component } from "@angular/core";
import { PlanService } from "../../../services/plan.service";
import { Plan } from "../../../models/Plan";

@Component({
    selector: 'planes',
    templateUrl: 'planes.html',
    providers: [PlanService]
})
export class PlanesComponent {

    public contratados: Plan[];
    public disponibles: Plan[];

    public constructor(
        private _planService: PlanService
    ) {
        
        this.contratados = null;
        this.disponibles = null;

        // Obtener planes contratados
        this._planService.getPlanesContratados().subscribe(
            Response => {
                this.contratados = Response;
            },
            error => {
                console.log(error);
            }
        )

        // Obtener planes no contratados
        this._planService.getPlanesNoContratados().subscribe(
            Response => {
                this.disponibles = Response;
            },
            error => {
                console.log(error);
            }
        )
    }


}