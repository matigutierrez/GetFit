import { Component, EventEmitter } from "@angular/core";
import { Horario } from "../../../models/Horario";
import { MaterializeAction } from "angular2-materialize";
import { HoraDia } from "../../../models/HoraDia";
import { DiaSemana } from "../../../models/DiaSemana";
import { HoraDiaService } from "../../../services/horadia.service";
import { DiaSemanaService } from "../../../services/diasemana.service";
import { Plan } from "../../../models/Plan";

@Component({
    selector: 'horario',
    templateUrl: 'horario.html',
    providers: [HoraDiaService, DiaSemanaService]
})
export class HorarioComponent {

    public mapHorario: any;
    public horario: Horario[];
    public horas: HoraDia[];
    public dias: DiaSemana[];

    public modalHorario = new EventEmitter<string|MaterializeAction>();

    public constructor(
        private horaDiaService: HoraDiaService,
        private diaSemanaService: DiaSemanaService
    ) {

        this.horario = null;
        this.mapHorario = {};

        this.horaDiaService.query().subscribe(Response => { this.horas = Response });
        this.diaSemanaService.query().subscribe(Response => { this.dias = Response });

    }

    public abrir(planes:Plan[]): void {
        
        this.horario = [];

        for (let i = 0; i < planes.length; i++) {

            let plan: Plan = planes[i];

            if ( plan.horarios ) {

                for (let j = 0; j < plan.horarios.length; j++) {
                    let horario: Horario = plan.horarios[j];

                    // Asegurarse que cada horario diga el nombre de su plan
                    horario.plan = plan;

                    this.horario.push(horario);
                }
                
            }

        }

        this.mapHorario = {};
        this.modalHorario.emit({ action: "modal", params:['open'] });

        for (let i = 0; i < this.horario.length; i++) {
            let horario: Horario = this.horario[i];
            if ( !this.mapHorario[horario.hora.id] ) {
                this.mapHorario[horario.hora.id] = {};
            }
            this.mapHorario[horario.hora.id][horario.dia.id] = horario;
        }

    }

    public cerrar(): void {

        this.modalHorario.emit({ action: "modal", params: ['close'] });
        this.horario = null;
        this.mapHorario = {};
        
    }

}