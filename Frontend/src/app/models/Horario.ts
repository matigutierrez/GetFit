import { HoraDia } from "./HoraDia";
import { DiaSemana } from "./DiaSemana";
import { Plan } from "./Plan";

export class Horario {

    public id: number;
    public tgf_hora_dia_id: number;
    public tgf_dia_semana_id: number;
    public tgf_plan_id: number;
    public hor_recuperativo: boolean;
    public hor_inactivo: boolean;

    public hora: HoraDia;
    public dia: DiaSemana;
    public plan: Plan;

    // Este atributo no es persistente
    public action: boolean = false;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.hora) { this.hora = new HoraDia(this.hora) };
        if (this.dia) { this.dia = new DiaSemana(this.dia) };
        if (this.plan) { this.plan = new Plan(this.plan) };

    }

    public static getJSON(horario: Horario): any {
        return {
            id: horario.id,
            tgf_hora_dia_id: horario.tgf_hora_dia_id,
            tgf_dia_semana_id: horario.tgf_dia_semana_id,
            tgf_plan_id: horario.tgf_plan_id,
            hor_recuperativo: horario.hor_recuperativo,
            hor_inactivo: horario.hor_inactivo
        }
    }

}