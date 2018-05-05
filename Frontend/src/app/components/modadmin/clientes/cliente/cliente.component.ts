import { OnInit, Component } from "@angular/core";
import { ClienteService } from "../../../../services/cliente.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'cliente',
    templateUrl: 'cliente.html',
    providers: [ClienteService]
})
export class ClienteComponent implements OnInit {

    public id: number;

    public constructor(
        private _clienteService: ClienteService,
        private _route: ActivatedRoute
    ) {

    }

    public ngOnInit() {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

}