import { HoraDia } from "./HoraDia";
import { DiaSemana } from "./DiaSemana";
import { Grupo } from "./Grupo";

export class Horario {

    public id: number;
    public tgf_hora_dia_id: number;
    public tgf_dia_semana_id: number;
    public tgf_grupo_id: number;
    public hor_recuperativo: boolean;
    public hor_inactivo: boolean;

    public hora: HoraDia;
    public dia: DiaSemana;
    public grupo: Grupo;

    // Este atributo no es persistente
    public action: boolean = false;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.hora) { this.hora = new HoraDia(this.hora) };
        if (this.dia) { this.dia = new DiaSemana(this.dia) };
        if (this.grupo) { this.grupo = new Grupo(this.grupo) };

    }

    public static getJSON(horario: Horario): any {
        return {
            id: horario.id,
            tgf_hora_dia_id: horario.tgf_hora_dia_id,
            tgf_dia_semana_id: horario.tgf_dia_semana_id,
            tgf_grupo_id: horario.tgf_grupo_id,
            hor_recuperativo: horario.hor_recuperativo,
            hor_inactivo: horario.hor_inactivo
        }
    }

}