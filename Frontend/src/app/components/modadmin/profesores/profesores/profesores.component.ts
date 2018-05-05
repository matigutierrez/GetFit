import { Component, ViewChild } from "@angular/core";
import { ProfesorService } from "../../../../services/profesor.service";
import { Profesor } from "../../../../models/Profesor";
import { PusherService } from "../../../../services/pusher.service";
import { RegistroProfesorComponent } from "../registroprofesor/registroprofesor.component";

@Component({
    selector: 'profesores',
    templateUrl: 'profesores.html',
    providers: [ProfesorService, PusherService]
})
export class ProfesoresComponent {

    public profesores: Profesor[];

    @ViewChild(RegistroProfesorComponent)
    public registroProfesor: RegistroProfesorComponent;

    private channel: any;

    public constructor(
        private _profesorService: ProfesorService,
        private _pusherService: PusherService
    ) {
        // Solicitar lista de profesores a backend
        this._profesorService.query().subscribe(
            Response => {
                this.profesores = Response;
            }
        );

        this.channel = this._pusherService.getPusher().subscribe('profesor');
        this.channel.bind('create', data => { this.onCreate(data) });
        this.channel.bind('update', data => { this.onUpdate(data) });
        this.channel.bind('delete', data => { this.onDelete(data) });

    }

    public deleteProfesor(id: number) {
        this._profesorService.delete(id).subscribe(null);
    }

    public onCreate(data: Profesor) {
        this.profesores.unshift(data);
    }

    public onUpdate(data: Profesor) {
        for (let i = 0; i < this.profesores.length; i++) {
            if (this.profesores[i].id == data.id) {
                this.profesores[i] = data;
            }
        }
    }

    public onDelete(id: number) {
        for (let i = 0; i < this.profesores.length; i++) {
            if (this.profesores[i].id == id) {
                this.profesores.splice(i, 1);
                break;
            }
        }
    }

}