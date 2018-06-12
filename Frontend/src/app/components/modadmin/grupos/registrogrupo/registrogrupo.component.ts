import { Component, EventEmitter, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { GrupoService } from '../../../../services/grupo.service';
import { SedeService } from '../../../../services/sede.service';
import { Grupo } from '../../../../models/Grupo';
import { Sede } from '../../../../models/Sede';
import { TipoGrupoService } from '../../../../services/tipogrupo.service';
import { TipoGrupo } from '../../../../models/TipoGrupo';

declare var Materialize: any;

@Component({
    selector: 'registrogrupo',
    templateUrl: 'registrogrupo.html'
})
export class RegistroGrupoComponent implements AfterViewChecked {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Grupo que se va a registrar
    public grupo: Grupo;

    // Lista de sedes
    public sedes: Sede[];

    // Lista de tipos de grupos
    public tipoGrupos: TipoGrupo[];

    public constructor(
        private _grupoService: GrupoService,
        private _sedeService: SedeService,
        private _tipoGrupoService: TipoGrupoService
    ) {

        this.limpiar();

        // Solicitar sedes
        this._sedeService.query().subscribe(
            Response => {
                this.sedes = Response;
            }
        );

        // Solicitar tipos de grupos
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

    public limpiar() {
        this.grupo = new Grupo();
        this.grupo.gru_solicitable = 1;
        this.grupo.tgf_sede_id = 1;
        this.grupo.tgf_tipo_grupo_id = 1;
    }

    public onSubmit() {
        // Si la sede y el tipo de grupo no son nulos
        if (this.grupo.tgf_sede_id != null && this.grupo.tgf_tipo_grupo_id != null) {

            // Registrar grupo
            this._grupoService.save(this.grupo).subscribe(
                Response => {
                    this.cerrar();
                    this.limpiar();
                }
            );
        }
    }

    public abrir() {
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

}