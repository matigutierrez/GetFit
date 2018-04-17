import { Component, OnInit, EventEmitter, ViewChild } from "@angular/core";
import { NotificacionService } from '../../../../services/notificacion.service';
import { Notificacion } from "../../../../models/Notificacion";
import { MaterializeAction } from "angular2-materialize";
import { NotificacionViewerComponent } from "../notificacionviewer/notificacionviewer.component";

@Component({
    selector: 'notificacion',
    templateUrl: 'notificacion.html',
    providers: [NotificacionService, NotificacionViewerComponent]
})
export class NotificacionComponent implements OnInit {

    // Componente NotificacionViewerComponent
    @ViewChild(NotificacionViewerComponent)
    private _notificacionViewerComponent: NotificacionViewerComponent;

    private notificaciones: Notificacion[];
    private modalActions = new EventEmitter<string|MaterializeAction>();

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

    public closeModal() {
        this.modalActions.emit({action:"modal",params:['close']});
    }

    public openModal(notificacion:Notificacion) {
        this._notificacionViewerComponent.setNotificacion(notificacion);
        this.modalActions.emit({action:"modal",params:['open']});
    }

}