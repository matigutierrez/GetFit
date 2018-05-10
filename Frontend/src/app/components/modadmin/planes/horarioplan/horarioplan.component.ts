import { Component, Input } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { Horario } from "../../../../models/Horario";
import { HoraDia } from "../../../../models/HoraDia";
import { DiaSemana } from "../../../../models/DiaSemana";
import { HoraDiaService } from "../../../../services/horadia.service";
import { DiaSemanaService } from "../../../../services/diasemana.service";
import { HorarioService } from "../../../../services/horario.service";

@Component({
    selector: 'horarioplan',
    templateUrl: 'horarioplan.html',
    providers: [HoraDiaService, DiaSemanaService, HorarioService]
})
export class HorarioPlanComponent {

    public plan: Plan;
    public mapHorario: any;
    public horario: Horario[];
    public horas: HoraDia[];
    public dias: DiaSemana[];

    public constructor(
        private horaDiaService: HoraDiaService,
        private diaSemanaService: DiaSemanaService,
        private horarioService: HorarioService
    ) {

        this.horario = null;
        this.mapHorario = {};

        this.horaDiaService.query().subscribe(Response => { this.horas = Response });
        this.diaSemanaService.query().subscribe(Response => { this.dias = Response });

    }

    public setPlan(plan: Plan): void {

        this.plan = plan;
        this.horario = [];
        this.mapHorario = {};

        if (plan.horarios) {

            for (let j = 0; j < plan.horarios.length; j++) {
                let horario: Horario = plan.horarios[j];

                // Asegurarse que cada horario diga el nombre de su plan
                horario.plan = plan;

                this.horario.push(horario);
            }

        }

        for (let i = 0; i < this.horario.length; i++) {
            let horario: Horario = this.horario[i];
            if (!this.mapHorario[horario.hora.id]) {
                this.mapHorario[horario.hora.id] = {};
            }
            this.mapHorario[horario.hora.id][horario.dia.id] = horario;
        }

    }

    public deactivateHorario(horario:Horario): void {
        // Desactivar horario, no borrar horario!
        horario.hor_inactivo = true;
        
        this.horarioService.update(Horario.getJSON(horario)).subscribe( Response => { horario.hor_inactivo = true } );

    }

    public activateHorario(horario:Horario): void {
        // Activar horario
        horario.hor_inactivo = false;
        
        this.horarioService.update(Horario.getJSON(horario)).subscribe( Response => { horario.hor_inactivo = false; } );

    }

    public createHorario(hora_id:number, dia_id:number) {

        let horario: Horario = new Horario();

        horario.tgf_hora_dia_id = hora_id;
        horario.tgf_dia_semana_id = dia_id;
        horario.tgf_plan_id = this.plan.id;
        horario.hor_inactivo = false;
        horario.hor_recuperativo = false;

        // Fijar un plan al objeto
        horario.plan = this.plan;

        // Insertar horario a la tabla
        if ( this.mapHorario[hora_id] == null ) {
            this.mapHorario[hora_id] = {};
        }
        this.mapHorario[hora_id][dia_id] = horario;

        // Agregar horario a lista de horarios
        this.horario.push(horario);

        this.horarioService.save( Horario.getJSON(horario) ).subscribe( Response => { horario.id = Response; });

    }

}