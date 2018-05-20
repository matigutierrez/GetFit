import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificacionService } from '../../../../services/notificacion.service';
import { Notificacion } from "../../../../models/Notificacion";
import { NotificacionViewerComponent } from "../notificacionviewer/notificacionviewer.component";

@Component({
    selector: 'notificacion',
    templateUrl: 'notificacion.html',
    providers: [NotificacionService, NotificacionViewerComponent]
})
export class NotificacionComponent implements OnInit {

    // Componente NotificacionViewerComponent
    @ViewChild(NotificacionViewerComponent)
    public notificacionViewerComponent: NotificacionViewerComponent;

    // Lista de notificaciones
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

    public registrar() {
        
    }

    public abrirNotificacion(notificacion: Notificacion) {
        this.notificacionViewerComponent.abrir(notificacion);
    }

}