import { Component, Input, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GrupoService } from '../../../../services/grupo.service';
import { SedeService } from '../../../../services/sede.service';
import { Grupo } from '../../../../models/Grupo';
import { Sede } from '../../../../models/Sede';
import { TipoGrupoService } from '../../../../services/tipogrupo.service';
import { TipoGrupo } from '../../../../models/TipoGrupo';

declare var Materialize: any;

@Component({
    selector: 'editargrupo',
    templateUrl: 'editargrupo.html'
})
export class EditarGrupoComponent implements AfterViewChecked {

    // Grupo a editar
    @Input("grupo")
    public grupo: Grupo;

    // Lista de sedes
    public sedes: Sede[];

    // Lista de tipos de grupos
    public tipoGrupos: TipoGrupo[];

    // Indicar a la vista si se está enviando la edición
    public editando: boolean;

    public constructor(
        private _grupoService: GrupoService,
        private _sedeService: SedeService,
        private _tipoGrupoService: TipoGrupoService
    ) {

        this._sedeService.query().subscribe(
            Response => {
                this.sedes = Response;
            }
        );

        this._tipoGrupoService.query().subscribe(
            Response => {
                this.tipoGrupos = Response;
            }
        );

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public onSubmit() {
        // Indicar que se está modificando el grupo
        this.editando = true;

        // Enviar modificaciones al servidor
        this._grupoService.update(this.grupo).subscribe(
            Response => {
                // Indicar a la vista que las modificaciones ya se recibieron
                this.editando = false;
            }
        )

    }

}