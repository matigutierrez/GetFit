import { Component, EventEmitter } from "@angular/core";
import { Grupo } from "../../../../models/Grupo";
import { ContratoService } from "../../../../services/contrato.service";
import { MaterializeAction } from "angular2-materialize";
import { SolicitudGrupoService } from "../../../../services/solicitudgrupo.service";

@Component({
    selector: 'solicitargrupo',
    templateUrl: 'solicitargrupo.html'
})
export class SolicitarGrupoComponent {

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // El grupo a solicitar
    public grupo: Grupo;

    // Indicar si el grupo ya habia sido contratado
    public contratado: boolean;

    // Indicar si el grupo ya habia sido solicitado
    public solicitado: boolean;

    // Indicar si se puede mostrar la pregunta por defecto
    public ok: boolean;

    // Indicar si se está solicitando
    public solicitando: boolean;

    public constructor(
        private _contratoService: ContratoService,
        private _solicitudGrupoService: SolicitudGrupoService
    ) {

    }

    public abrir(grupo: Grupo) {
        // Al abrir el modal
        this.grupo = grupo;

        // Resetear variables
        this.contratado = false;
        this.solicitado = false;
        this.ok = false;
        this.solicitando = false;

        // Verificar que no haya contrato actualmente
        this._contratoService.findToken(this.grupo.id).subscribe(
            Response => {
                // Indicar si el grupo ya había sido contratado
                this.contratado = Response != null;

                // Verificar que no haya solicitud
                this._solicitudGrupoService.findToken(this.grupo.id).subscribe(
                    Response => {
                        // Indicar si el grupo ya había sido solicitado
                        this.solicitado = Response != null;

                        // Indicar si se puede mostrar la pregunta por defecto
                        this.ok = !this.contratado && !this.solicitado;
                    }
                );
                
            }
        );

        this.modal.emit({ action: "modal", params: ['open'] });

    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {

        if ( this.grupo.gru_solicitable == 0 ) {
            // Si el grupo no es solicitable

            // Solo cerrar el modal
            this.cerrar();
        } else if ( this.contratado ) {
            // Si el grupo ya había sido contratado

            // Solo cerrar el modal
            this.cerrar();
        } else if ( this.solicitado ) {
            // Si el grupo ya había sido solicitando

            // Solo cerrar el modal
            this.cerrar();
        } else {
            // Cualquier otro caso, verificar que no haya solicitud
            this._solicitudGrupoService.findToken(this.grupo.id).subscribe(
                Response => {

                    if ( Response == null ) {
                        // Indicar que se está solicitando el grupo
                        this.solicitando = true;

                        // No hay solicitud de grupo, solicitar grupo
                        this._solicitudGrupoService.solicitar(this.grupo.id).subscribe(
                            Response => {
                                // Dejar de indicar que se está solicitando el grupo
                                this.solicitando = false;

                                // Solicitud realizada, cerrar modal
                                this.cerrar();
                            }
                        )
                    } else {
                        // Ya había solicitud de grupo, cerrar modal
                        this.cerrar();
                    }

                }
            );
        }

    }

}