import { Component } from "@angular/core";
import { PlanService } from "../../../services/plan.service";
import { Plan } from "../../../models/Plan";

@Component({
    selector: 'planes',
    templateUrl: 'planes.html',
    providers: [PlanService]
})
export class PlanesComponent {

    private planes: Plan[];

    public constructor(
        private _planService: PlanService
    ) {

    }


}