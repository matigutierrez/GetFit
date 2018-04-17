import { Component, OnInit, Input } from "@angular/core";
import { Notificacion } from "../../../../models/Notificacion";

@Component({
    selector: 'notificacionviewer',
    templateUrl: 'notificacionviewer.html',
    providers: []
})
export class NotificacionViewerComponent implements OnInit {
    
    public notificacion:Notificacion;

    public constructor() {
        this.notificacion = null;
    }

    public ngOnInit() {

    }
    
}