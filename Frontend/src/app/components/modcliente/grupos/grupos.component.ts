import { Component, ViewChild } from "@angular/core";
import { Grupo } from "../../../models/Grupo";
import { Contrato } from "../../../models/Contrato";
import { HorarioComponent } from "../../extra/horario/horario.component";
import { SolicitudGrupo } from "../../../models/SolicitudGrupo";
import { ContratoService } from "../../../services/contrato.service";
import { SolicitudGrupoService } from "../../../services/solicitudgrupo.service";

@Component({
    selector: 'grupos',
    templateUrl: 'grupos.html'
})
export class GruposComponent {

    @ViewChild(HorarioComponent)
    public horarioComponent: HorarioComponent;

    // Contratos actuales
    public contratos: Contrato[];

    // Solicitudes actuales
    public solicitudes: SolicitudGrupo[];

    // Paginas
    public p1: number = 1;
    public p2: number = 1;
    public p3: number = 1;

    public constructor(
        private _solicitudGrupoService: SolicitudGrupoService,
        private _contratoService: ContratoService
    ) {

        // Obtener contratos
        this._contratoService.queryToken().subscribe(
            Response => {
                this.contratos = Response;
            }
        )

        // Obtener solicitados
        this._solicitudGrupoService.queryToken().subscribe(
            Response => {
                this.solicitudes = Response;
            }
        );
        
    }

    public abrirHorarios(grupo: Grupo) {
        this.horarioComponent.abrir([grupo]);
    }

}