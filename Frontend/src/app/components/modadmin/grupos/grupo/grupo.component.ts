import { GrupoService } from "../../../../services/grupo.service";
import { Component, Input, OnInit, ViewChild, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Grupo } from "../../../../models/Grupo";
import { HorarioComponent } from "../../../extra/horario/horario.component";
import { HorarioGrupoComponent } from "../horariogrupo/horariogrupo.component";
import { Contrato } from "../../../../models/Contrato";
import { EditarGrupoComponent } from "../editargrupo/editargrupo.component";
import { InscripcionGrupoComponent } from "../inscripciongrupo/inscripciongrupo.component";
import { PagoCobranzaComponent } from "../../cobranzas/pagocobranza/pagocobranza.component";
import { RegistroCobranzaGrupoComponent } from "../registrocobranzagrupo/registrocobranzagrupo.component";
import { CancelarContratoComponent } from "../cancelarcontrato/cancelarcontrato.component";

@Component({
    selector: 'grupo',
    templateUrl: 'grupo.html'
})
export class GrupoComponent implements OnInit {

    @ViewChild(HorarioGrupoComponent)
    public horarioGrupo: HorarioGrupoComponent;

    @ViewChild(EditarGrupoComponent)
    public editarGrupo: EditarGrupoComponent;

    @ViewChild(InscripcionGrupoComponent)
    public inscripcionGrupoComponent: InscripcionGrupoComponent;

    @ViewChild(PagoCobranzaComponent)
    public pagoCobranzaComponent: PagoCobranzaComponent;

    @ViewChild(RegistroCobranzaGrupoComponent)
    public registroCobranzaGrupoComponent: RegistroCobranzaGrupoComponent;

    @ViewChild(CancelarContratoComponent)
    public cancelarContratoComponent: CancelarContratoComponent;

    // El id del grupo
    public id: number;

    // El grupo actual
    public grupo: Grupo;

    public constructor(
        private _grupoService: GrupoService,
        private _route: ActivatedRoute
    ) {
        this._route.params.subscribe(params => {
            this.id = params["id"];
        });
    }

    public ngOnInit() {

        this._grupoService.get(this.id).subscribe(
            Response => {
                this.grupo = Response;
            }
        )

    }

}