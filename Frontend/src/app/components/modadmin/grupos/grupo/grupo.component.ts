import { GrupoService } from "../../../../services/grupo.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Grupo } from "../../../../models/Grupo";

@Component({
    selector: 'grupo',
    templateUrl: 'grupo.html'
})
export class GrupoComponent implements OnInit {

    // El id del grupo
    public id: number;

    // El grupo actual
    public grupo: Grupo;

    public constructor(
        private _grupoService: GrupoService,
        private _route: ActivatedRoute
    ) {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

    public ngOnInit() {

        this._grupoService.get(this.id).subscribe(
            Response => {
                this.grupo = Response;
            }
        )

    }

}