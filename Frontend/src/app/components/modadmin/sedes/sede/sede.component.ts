import { Component, OnInit } from "@angular/core";
import { Sede } from "../../../../models/Sede";
import { ActivatedRoute } from "@angular/router";
import { SedeService } from "../../../../services/sede.service";

@Component({
    selector: 'sede',
    templateUrl: 'sede.html'
})
export class SedeComponent implements OnInit {

    // Id de la sede
    public id: number;

    // Objeto de la sede
    public sede: Sede;
    
    public constructor(
        private _sedeService: SedeService,
        private _route: ActivatedRoute
    ) {
        
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });

    }

    public ngOnInit() {
        // Solicitar sede a backend
        this._sedeService.get(this.id).subscribe(
            Response => {
                this.sede = Response;
            }
        );
    }

}