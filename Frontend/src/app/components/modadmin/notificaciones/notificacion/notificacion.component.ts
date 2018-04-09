import { Component, OnInit } from "@angular/core";
import { NotificacionService } from '../../../../services/notificacion.service';
import { Notificacion } from "../../../../models/Notificacion";

@Component({
    selector: 'notificacion',
    templateUrl: 'notificacion.html',
    providers: []
})
export class NotificacionComponent implements OnInit {

    public notificaciones: Notificacion[];

    public constructor(
        private _notificacionService: NotificacionService
    ) {
        this._notificacionService.query().subscribe(
            Response => {
                this.notificaciones = Response;
            },
            Error => {
                console.log(<any>Error)
            }
        );
    }

    public ngOnInit() {

    }

    public openCreate() {
        
    }

}