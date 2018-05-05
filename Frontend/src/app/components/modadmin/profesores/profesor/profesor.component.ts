import { OnInit, Component } from "@angular/core";
import { ProfesorService } from "../../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'profesor',
    templateUrl: 'profesor.html',
    providers: [ProfesorService]
})
export class ProfesorComponent implements OnInit {

    public id: number;

    public constructor(
        private _profesorService: ProfesorService,
        private _route: ActivatedRoute
    ) {

    }

    public ngOnInit() {
        this._route.params.subscribe(
            params => {
                this.id = params["id"];
            }
        )
    }

}