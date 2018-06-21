import { Component, EventEmitter } from "@angular/core";
import { GrupoService } from "../../../../services/grupo.service";
import { Grupo } from "../../../../models/Grupo";
import { MaterializeAction } from "angular2-materialize";

@Component({
    selector: 'eliminargrupo',
    templateUrl: 'eliminargrupo.html'
})
export class EliminarGrupoComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Grupo a eliminar
    public grupo: Grupo;

    // Indicar que se encuentra eliminando la sede
    public eliminando: boolean;

    public constructor(
        private _grupoService: GrupoService
    ) {

    }

    public abrir(grupo: Grupo) {
        this.grupo = grupo;
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.eliminando = false;
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Indicar que se encuentra eliminando el grupo
        this.eliminando = true;

        // Eliminar el grupo
        this._grupoService.delete(this.grupo.id).subscribe(
            Response => {
                // Cerrar modal
                this.cerrar();
            }
        );
    }

}