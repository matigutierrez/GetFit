import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Notificacion } from "../../../../models/Notificacion";
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'notificacionviewer',
    templateUrl: 'notificacionviewer.html',
    providers: []
})
export class NotificacionViewerComponent implements OnInit {

    // Modal
    public modal = new EventEmitter<string|MaterializeAction>();
    
    // Notificacion actual para visualizar
    public notificacion: Notificacion;

    public constructor() {
        this.notificacion = null;
    }

    public ngOnInit() {

    }

    public abrir(notificacion: Notificacion) {
        this.notificacion = notificacion;
        this.modal.emit({ action:"modal", params:['open'] });
    }

    public cerrar() {
        this.modal.emit({ action:"modal", params:['close'] });
    }
    
}