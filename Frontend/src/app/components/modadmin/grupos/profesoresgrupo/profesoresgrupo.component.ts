import { Component, Input } from "@angular/core";
import { Grupo } from "../../../../models/Grupo";
import { ProfesorService } from "../../../../services/profesor.service";
import { Profesor } from "../../../../models/Profesor";
import { GrupoService } from "../../../../services/grupo.service";
import { PusherService } from "../../../../services/pusher.service";

@Component({
    selector: 'profesoresgrupo',
    templateUrl: 'profesoresgrupo.html'
})
export class ProfesoresGrupoComponent {

    // Grupo del componente
    public grupo: Grupo;

    // Profesores del grupo
    public profesores: Profesor[];

    // Canal de pusher
    private channel: any;

    public constructor(
        private _grupoService: GrupoService,
        private _profesorService: ProfesorService,
        private _pusherService: PusherService
    ) {

    }

    @Input("grupo")
    public set setGrupo(grupo: Grupo) {
        // Fijar el grupo
        this.grupo = grupo;

        // Obtener profesores del grupo
        this._grupoService.getProfesores(this.grupo).subscribe(
            Response => {

                // Guardar profesores
                this.profesores = Response;

            }

        )
        
    }

}