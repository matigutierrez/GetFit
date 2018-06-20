import { Component, Input, OnDestroy, ViewChild } from "@angular/core";
import { GrupoService } from "../../../../services/grupo.service";
import { Cliente } from "../../../../models/Cliente";
import { Grupo } from "../../../../models/Grupo";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { PusherService } from "../../../../services/pusher.service";
import { InscripcionGrupoComponent } from "../inscripciongrupo/inscripciongrupo.component";
import { SolicitudGrupo } from "../../../../models/SolicitudGrupo";
import { SolicitudGrupoService } from "../../../../services/solicitudgrupo.service";
import { Cobranza } from "../../../../models/Cobranza";
import { ContratoHistorico } from "../../../../models/ContratoHistorico";
import { ContratoHistoricoService } from "../../../../services/contratohistorico.service";
import { CancelarContratoComponent } from "../cancelarcontrato/cancelarcontrato.component";

@Component({
    selector: 'clientesgrupo',
    templateUrl: 'clientesgrupo.html',
    styleUrls: ['clientesgrupo.css']
})
export class ClientesGrupoComponent implements OnDestroy {

    // Componente de inscripción de clientes a un grupo
    @ViewChild(InscripcionGrupoComponent)
    public inscripcionGrupoComponent: InscripcionGrupoComponent;

    // Componente para cancelar contratos
    @ViewChild(CancelarContratoComponent)
    public cancelarContratoComponent: CancelarContratoComponent;

    // Lista de contratos
    public contratos: Contrato[];

    // Lista de contratos historicos
    public contratosHistoricos: ContratoHistorico[];

    // Lista de solicitudes de grupos
    public solicitudes: SolicitudGrupo[];

    // Grupo actual
    public grupo: Grupo;

    // Numero de página
    public p1: number = 1;
    public p2: number = 1;

    // Canal de contratos
    private contratoChannel: any;

    // Canal de contratos historicos
    private contratoHistoricoChannel: any;

    // Canal de solicitudes
    private solicitudChannel: any;

    public constructor(
        private _grupoService: GrupoService,
        private _contratoService: ContratoService,
        private _contratoHistoricoService: ContratoHistoricoService,
        private _solicitudGrupoService: SolicitudGrupoService,
        private _pusherService: PusherService
    ) {

        this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
        this.contratoChannel.bind("create", data => { this.onCreateContrato(new Contrato(data)) });
        this.contratoChannel.bind("update", data => { this.onUpdateContrato(new Contrato(data)) });
        this.contratoChannel.bind("delete", data => { this.onDeleteContrato(data) });

        this.contratoHistoricoChannel = this._pusherService.getPusher().subscribe('contrato_historico');
        this.contratoHistoricoChannel.bind("create", data => { this.onCreateContratoHistorico(new ContratoHistorico(data)) });
        this.contratoHistoricoChannel.bind("update", data => { this.onUpdateContratoHistorico(new ContratoHistorico(data)) });

        this.solicitudChannel = this._pusherService.getPusher().subscribe('solicitudGrupo');
        this.solicitudChannel.bind("create", data => { this.onCreateSolicitud(new SolicitudGrupo(data)) });
        this.solicitudChannel.bind("update", data => { this.onUpdateSolicitud(new SolicitudGrupo(data)) });
        this.solicitudChannel.bind("delete", data => { this.onDeleteSolicitud(data) });

    }

    public ngOnDestroy() {
        if (this.contratoChannel) {
            this.contratoChannel.unbind();
        }
        if (this.contratoHistoricoChannel) {
            this.contratoHistoricoChannel.unbind();
        }
        if (this.solicitudChannel) {
            this.solicitudChannel.unbind();
        }
    }

    public deleteContrato(contrato: Contrato) {
        // Eliminar un contrato
        this.cancelarContratoComponent.abrir(contrato);
    }

    public deleteSolicitud(solicitud: SolicitudGrupo) {
        // Eliminar una solicitud de grupo
        this._solicitudGrupoService.delete(solicitud.id).subscribe(null);
    }

    public okSolicitud(solicitud: SolicitudGrupo) {
        // Crear un contrato historico
        let contratoHistorico: ContratoHistorico = new ContratoHistorico();

        // Fijar cliente y grupo
        contratoHistorico.tgf_cliente_id = solicitud.tgf_cliente_id;
        contratoHistorico.tgf_grupo_id = solicitud.tgf_grupo_id;

        // Guardar contrato
        this._contratoHistoricoService.save(contratoHistorico, null).subscribe(null);
    }

    public onCreateContrato(contrato: Contrato) {
        // Si hay contratos
        if (this.contratos) {
            // Si el contrato pertenece al grupo
            if (contrato.tgf_grupo_id == this.grupo.id) {
                // Agregar contrato a la lista de contratos
                this.contratos.unshift(contrato);
            }
        }
    }

    public onUpdateContrato(contrato: Contrato) {
        // Si hay contratos
        if (this.contratos) {
            // Si el contrato pertenece al grupo
            if (contrato.tgf_grupo_id == this.grupo.id) {
                // Por cada contrato
                for (let i = 0; i < this.contratos.length; i++) {
                    // Comparar ids
                    if (this.contratos[i].id == contrato.id) {
                        // Reemplazar contrato
                        this.contratos[i] = contrato;
                        break;
                    }
                }
            }
        }
    }

    public onDeleteContrato(id: number) {
        // Si hay contratos
        if (this.contratos) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                // Comaparar ids
                if (this.contratos[i].id == id) {
                    // Eliminar contrato
                    this.contratos.splice(i, 1);
                    break;
                }
            }
        }
    }

    public onCreateSolicitud(solicitud: SolicitudGrupo) {
        // Si hay solicitudes
        if (this.solicitudes) {
            // Si la solicitud pertenece al grupo
            if (solicitud.tgf_grupo_id == this.grupo.id) {
                // Agregar contrato a la lista de contratos
                this.solicitudes.unshift(solicitud);
            }
        }
    }

    public onUpdateSolicitud(solicitud: SolicitudGrupo) {
        // Si hay solicitudes
        if (this.solicitudes) {
            // Si la solicitud pertenece al grupo
            if (solicitud.tgf_grupo_id == this.grupo.id) {
                // Por cada solicitud
                for (let i = 0; i < this.solicitudes.length; i++) {
                    // Comparar ids
                    if (this.solicitudes[i].id == solicitud.id) {
                        // Reemplazar solicitud
                        this.solicitudes[i] = solicitud;
                        break;
                    }
                }
            }
        }
    }

    public onDeleteSolicitud(id: number) {
        // Si hay solicitudes
        if (this.solicitudes) {
            // Por cada solicitud
            for (let i = 0; i < this.solicitudes.length; i++) {
                // Si los IDs coinciden
                if (this.solicitudes[i].id == id) {
                    // Eliminar solicitud
                    this.solicitudes.splice(i, 1);
                    break;
                }
            }
        }
    }

    public onCreateContratoHistorico(contratoHistorico: ContratoHistorico) {
        // Si se ha recibido la lista de contratos historicos
        if (this.contratosHistoricos) {
            // Agregar a la lista de contratos historicos
            this.contratosHistoricos.unshift(contratoHistorico);
        }
    }

    public onUpdateContratoHistorico(contratoHistorico: ContratoHistorico) {
        // Si se ha recibido la lista de contratos historicos
        if (this.contratosHistoricos) {
            // Por cada contrato historico
            for (let i = 0; i < this.contratosHistoricos.length; i++) {
                // Si los IDs coinciden
                if (this.contratosHistoricos[i].id == contratoHistorico.id) {
                    // Reemplazar contrato historico
                    this.contratosHistoricos[i] = contratoHistorico;
                    break;
                }
            }
        }

        // Si se ha recibido la lista de contratos
        if (this.contratos) {
            // Por cada contrato
            for (let i = 0; i < this.contratos.length; i++) {
                let contrato: Contrato = this.contratos[i];

                // Si los IDs coinciden
                if (contrato.contrato_historico.id == contratoHistorico.id) {
                    // Reemplazar contrato historico
                    contrato.contrato_historico = contratoHistorico;
                    break;
                }
            }
        }
    }

    @Input("grupo")
    set setGrupo(grupo: Grupo) {

        // Si hay grupo
        if (grupo != null && grupo.id) {

            // Guardar el grupo
            this.grupo = grupo;

            // Obtener los contratos del grupo
            this._grupoService.getContratos(this.grupo).subscribe(
                Response => {
                    this.contratos = Response;
                }
            );

            // Obtener los contratos historicos del grupo
            this._grupoService.getContratosHistoricos(this.grupo).subscribe(
                Response => {
                    this.contratosHistoricos = Response;
                }
            );

            // Obtener las solicitudes del grupo
            this._grupoService.getSolicitudes(this.grupo).subscribe(
                Response => {
                    this.solicitudes = Response;
                }
            );

        }

    }

}