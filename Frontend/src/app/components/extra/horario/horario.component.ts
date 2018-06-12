import { Component, EventEmitter, OnDestroy } from "@angular/core";
import { Horario } from "../../../models/Horario";
import { MaterializeAction } from "angular2-materialize";
import { HoraDia } from "../../../models/HoraDia";
import { DiaSemana } from "../../../models/DiaSemana";
import { HoraDiaService } from "../../../services/horadia.service";
import { DiaSemanaService } from "../../../services/diasemana.service";
import { Grupo } from "../../../models/Grupo";
import { PusherService } from "../../../services/pusher.service";
import { GrupoService } from "../../../services/grupo.service";

@Component({
    selector: 'horario',
    templateUrl: 'horario.html'
})
export class HorarioComponent implements OnDestroy {

    private grupos: Grupo[];

    public mapHorario: any;
    public horario: Horario[];
    public horas: HoraDia[];
    public dias: DiaSemana[];

    public modal = new EventEmitter<string | MaterializeAction>();

    private channel: any;

    public constructor(
        private horaDiaService: HoraDiaService,
        private diaSemanaService: DiaSemanaService,
        private grupoService: GrupoService,
        private pusherService: PusherService
    ) {

        this.horario = null;
        this.mapHorario = {};

        this.horaDiaService.query().subscribe(Response => { this.horas = Response });
        this.diaSemanaService.query().subscribe(Response => { this.dias = Response });

        this.channel = this.pusherService.getPusher().subscribe('horario');
        this.channel.bind('create', data => { this.onCreate(data) });
        this.channel.bind('update', data => { this.onUpdate(data) });
        this.channel.bind('delete', data => { this.onDelete(data) });

    }

    public ngOnDestroy() {
        if (this.channel) {
            this.channel.unbind();
        }
    }

    private putHorario(horario: Horario) {

        let hora: number = horario.tgf_hora_dia_id;
        let dia: number = horario.tgf_dia_semana_id;

        if (this.mapHorario[hora] == null) {
            this.mapHorario[hora] = {};
        }

        let horarioAnterior: Horario = this.mapHorario[hora][dia];

        if (horarioAnterior != null) {
            let indice = this.horario.indexOf(horarioAnterior);
            if (indice != null) {
                this.horario.splice(indice, 1);
            }
        }

        this.mapHorario[hora][dia] = horario;
        this.horario.push(horario);

    }

    public onCreate(horario: Horario): void {

        for (let i = 0; i < this.grupos.length; i++) {

            let grupo = this.grupos[i];

            if (horario.tgf_grupo_id == grupo.id) {

                // Fijar un grupo al objeto
                horario.grupo = grupo;

                this.putHorario(horario);

            }

        }

    }

    public onUpdate(horario: Horario): void {
        // Si el horario actualizado pertenece al grupo
        for (let i = 0; i < this.grupos.length; i++) {

            let grupo = this.grupos[i];

            if (horario.tgf_grupo_id == grupo.id) {

                horario.grupo = grupo;
                this.putHorario(horario);

            }

        }

    }

    public onDelete(id: number): void {
        // Para cada horario
        for (let i = 0; i < this.horario.length; i++) {

            // Obtener el horario
            let horario = this.horario[i];

            // Que tenga el id del horario eliminado
            if (horario.id == id) {

                // Quitar el horario de la lista
                this.horario.splice(i, 0);

                // Quitar el horario de la tabla
                if (this.mapHorario[horario.tgf_hora_dia_id]) {
                    this.mapHorario[horario.tgf_hora_dia_id][horario.tgf_dia_semana_id] = null;
                }

            }

        }

    }

    public abrir(grupos: Grupo[]): void {

        this.mapHorario = {};
        this.horario = [];
        this.grupos = grupos;

        // Por cada grupo
        for (let i = 0; i < grupos.length; i++) {

            let grupo: Grupo = grupos[i];

            // Solicitar horarios
            this.grupoService.getHorarios(grupo).subscribe(
                Response => {

                    for (let j = 0; j < Response.length; j++) {

                        // Cada horario
                        let horario: Horario = Response[j];

                        // Horario contiene el grupo
                        horario.grupo = grupo;

                        // Insertar horario a la tabla
                        this.putHorario(horario);

                    }

                }
            );

        }

        this.modal.emit({ action: "modal", params: ['open'] });

    }

    public cerrar(): void {

        this.modal.emit({ action: "modal", params: ['close'] });

    }

}