import { PlanService } from "../../../../services/plan.service";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'plan',
    templateUrl: 'plan.html',
    providers: [PlanService]
})
export class PlanComponent implements OnInit {

    public id: number;

    public constructor(
        private _planService: PlanService,
        private _route: ActivatedRoute
    ) {

    }

    public ngOnInit() {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

}