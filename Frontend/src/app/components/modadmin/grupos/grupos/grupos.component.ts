import { Component, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GrupoService } from '../../../../services/grupo.service';
import { MaterializeAction } from 'angular2-materialize';
import { Grupo } from '../../../../models/Grupo';
import { Cliente } from '../../../../models/Cliente';
import { PusherService } from '../../../../services/pusher.service';
import { GLOBAL } from '../../../../services/global';
import { Contrato } from '../../../../models/Contrato';
import { InscripcionGrupoComponent } from '../inscripciongrupo/inscripciongrupo.component';
import { RegistroGrupoComponent } from '../registrogrupo/registrogrupo.component';
import { HorarioComponent } from '../../../extra/horario/horario.component';
import { Horario } from '../../../../models/Horario';
import { ContratosComponent } from '../../clientes/contratos/contratos.component';

@Component({
    selector: 'grupos',
    templateUrl: 'grupos.html'
})
export class GruposComponent implements OnDestroy {

    @ViewChild(ContratosComponent)
    public contratosComponent: ContratosComponent;

    @ViewChild(RegistroGrupoComponent)
    public registroGrupoComponent: RegistroGrupoComponent;

    @ViewChild(InscripcionGrupoComponent)
    public inscripcionGrupoComponent: InscripcionGrupoComponent;

    @ViewChild(HorarioComponent)
    public horario: HorarioComponent;

    // Lista de grupos
    public grupos: Grupo[];
    public modalCreate = new EventEmitter<string | MaterializeAction>();
    public parametros: string;

    // Lista de contratos
    public contratos: Contrato[] = [];

    // Pagina actual
    public p: number = 1;

    // Canal de pusher para grupos
    private grupoChannel: any;

    // Canal de pusher para contratos
    private contratoChannel: any;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _grupoService: GrupoService,
        private _pusherService: PusherService
    ) {

        // Solicitar grupos al backend
        this._grupoService.query().subscribe(
            Response => {
                // Guardar lista de grupos
                this.grupos = Response;

                // Para cada grupo
                for (let i = 0; i < this.grupos.length; i++) {
                    let grupo: Grupo = this.grupos[i];
                    // Para los contratos del grupo
                    let contratos: Contrato[] = grupo.contratos;
                    // Si hay contratos
                    if (contratos && contratos.length > 0) {
                        // Para cada contrato
                        for (let i = 0; i < contratos.length; i++) {
                            // Contrato debe contener al grupo
                            contratos[i].contrato_historico.grupo = grupo;
                        }
                    }
                }
            }
        );

        this.grupoChannel = this._pusherService.getPusher().subscribe('grupo');
        this.grupoChannel.bind('create', data => { this.onCreate(new Grupo(data)) });
        this.grupoChannel.bind('update', data => { this.onUpdate(new Grupo(data)) });
        this.grupoChannel.bind('delete', data => { this.onDelete(data) });

        this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
        this.contratoChannel.bind('create', data => { this.onCreateContrato(new Contrato(data)) });
        this.contratoChannel.bind('update', data => { this.onUpdateContrato(new Contrato(data)) });
        this.contratoChannel.bind('delete', data => { this.onDeleteContrato(data) });

    }

    public ngOnDestroy() {
        if (this.grupoChannel) {
            this.grupoChannel.unbind();
        }
        if (this.contratoChannel) {
            this.contratoChannel.unbind();
        }
    }

    public abrirHorarios(grupo: Grupo) {
        // Al abrir horarios
        this.horario.abrir([grupo]);
    }

    public abrirContratos(contratos: Contrato[]) {
        // Al visualizar la lista de contratos
        this.contratos = contratos;
        this.contratosComponent.abrir();
    }

    public deleteGrupo(id: number) {
        // Al eliminar un grupo
        this._grupoService.delete(id).subscribe(null);
    }

    public registerGrupo() {
        // Al registrar un grupo
        this.registroGrupoComponent.abrir()
    }

    public onCreate(grupo: Grupo) {
        // Para los contratos del grupo
        let contratos: Contrato[] = grupo.contratos;
        // Si hay contratos
        if (contratos && contratos.length > 0) {
            // Para cada contrato
            for (let i = 0; i < contratos.length; i++) {
                // Contrato debe contener al grupo
                contratos[i].contrato_historico.grupo = grupo;
            }
        }
        // Agregar grupo a la lista
        this.grupos.unshift(grupo);
    }

    public onUpdate(grupo: Grupo) {
        // Si se ha recibido la lista de grupos
        if (this.grupos) {
            // Para los contratos del grupo
            let contratos: Contrato[] = grupo.contratos;
            // Si hay contratos
            if (contratos && contratos.length > 0) {
                // Para cada contrato
                for (let i = 0; i < contratos.length; i++) {
                    // Contrato debe contener al grupo
                    contratos[i].contrato_historico.grupo = grupo;
                }
            }
            // Para cada grupo
            for (let i = 0; i < this.grupos.length; i++) {
                // Buscar grupo cuyo id coincida
                if (this.grupos[i].id == grupo.id) {
                    // Actualizar el grupo
                    this.grupos[i] = grupo;
                    break;
                }
            }
        }
    }

    public onDelete(id: number) {
        if (this.grupos) {
            // Para cada grupo
            for (let i = 0; i < this.grupos.length; i++) {
                // Si hay un grupo cuyo id coincida
                if (this.grupos[i].id == id) {
                    // Eliminar el grupo
                    this.grupos.splice(i, 1);
                    break;
                }
            }
        }
    }

    public onCreateContrato(contrato: Contrato) {
        if (this.grupos) {
            // Para cada grupo
            for (let i = 0; i < this.grupos.length; i++) {
                let grupo: Grupo = this.grupos[i];
                // Si hay un grupo al que pertenezca el contrato
                if (grupo.id == contrato.tgf_grupo_id) {
                    // Agregar contrato al grupo
                    grupo.contratos.unshift(contrato);
                    // Contrato debe contener al grupo
                    contrato.contrato_historico.grupo = grupo;
                }
            }
        }
    }

    public onUpdateContrato(contrato: Contrato) {
        if (this.grupos) {
            // Para cada grupo
            for (let i = 0; i < this.grupos.length; i++) {
                let grupo: Grupo = this.grupos[i];
                // Si hay un grupo al que pertenezca el contrato
                if (grupo.id == contrato.tgf_grupo_id) {
                    // Contrato debe contener al grupo
                    contrato.contrato_historico.grupo = grupo;
                    // Lista de contratos del grupo
                    let contratos: Contrato[] = grupo.contratos;
                    // Para cada contrato
                    for (let j = 0; j < contratos.length; j++) {
                        // Si hay un contrato cuyo id coincida
                        if (contratos[j].id == contrato.id) {
                            contratos[j] = contrato;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    public onDeleteContrato(id: number) {
        if (this.grupos) {
            // Para cada grupo
            for (let i = 0; i < this.grupos.length; i++) {
                let grupo: Grupo = this.grupos[i];
                // Para cada contrato del grupo
                for (let j = 0; j < grupo.contratos.length; j++) {
                    // Buscar contrato cuyo id coincida
                    if (grupo.contratos[j].id == id) {
                        // Eliminar contrato
                        grupo.contratos.splice(j, 1);
                        break;
                    }
                }
            }
        }
    }

}