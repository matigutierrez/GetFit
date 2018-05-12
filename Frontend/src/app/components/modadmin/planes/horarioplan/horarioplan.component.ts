import { Component, Input, OnDestroy } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { Horario } from "../../../../models/Horario";
import { HoraDia } from "../../../../models/HoraDia";
import { DiaSemana } from "../../../../models/DiaSemana";
import { HoraDiaService } from "../../../../services/horadia.service";
import { DiaSemanaService } from "../../../../services/diasemana.service";
import { HorarioService } from "../../../../services/horario.service";
import { PusherService } from "../../../../services/pusher.service";

@Component({
    selector: 'horarioplan',
    templateUrl: 'horarioplan.html',
    providers: [HoraDiaService, DiaSemanaService, HorarioService, PusherService]
})
export class HorarioPlanComponent implements OnDestroy {

    public plan: Plan;
    public mapHorario: any;
    public horario: Horario[];
    public horas: HoraDia[];
    public dias: DiaSemana[];

    private channel: any;

    public constructor(
        private horaDiaService: HoraDiaService,
        private diaSemanaService: DiaSemanaService,
        private horarioService: HorarioService,
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

        if (horario.tgf_plan_id == this.plan.id) {

            // Fijar un plan al objeto
            horario.plan = this.plan;

            this.putHorario(horario);

        }

    }

    public onUpdate(horario: Horario): void {
        // Si el horario actualizado pertenece al plan
        if (horario.tgf_plan_id == this.plan.id) {

            horario.plan = this.plan;
            this.putHorario(horario);

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

    public setPlan(plan: Plan): void {

        this.plan = plan;
        this.horario = [];
        this.mapHorario = {};

        if (plan.horarios) {

            for (let j = 0; j < plan.horarios.length; j++) {

                // Cada horario
                let horario: Horario = plan.horarios[j];

                // Horario contiene el plan
                horario.plan = plan;

                // Insertar horario a la tabla
                this.putHorario(horario);
            }

        }

    }

    public deactivateHorario(horario: Horario): void {
        // Desactivar horario, no borrar horario!
        horario.hor_inactivo = true;
        horario.action = true;

        this.horarioService.update(horario).subscribe(
            Response => {
                horario.hor_inactivo = true
                horario.action = false;
            }
        );

    }

    public activateHorario(horario: Horario): void {
        // Activar horario
        horario.hor_inactivo = false;
        horario.action = true;

        this.horarioService.update(horario).subscribe(
            Response => {
                horario.hor_inactivo = false;
                horario.action = false;
            }
        );

    }

    public createHorario(hora_id: number, dia_id: number) {

        // Crear objeto horario
        let horario: Horario = new Horario();

        horario.tgf_hora_dia_id = hora_id;
        horario.tgf_dia_semana_id = dia_id;
        horario.tgf_plan_id = this.plan.id;
        horario.hor_inactivo = false;
        horario.hor_recuperativo = false;

        // Fijar un plan al objeto
        horario.plan = this.plan;
        horario.action = true;

        this.putHorario(horario);

        this.horarioService.save(horario).subscribe(
            Response => {
                horario.id = Response;
                horario.action = false;
            }
        );

    }

}