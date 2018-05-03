import { HoraDia } from "./HoraDia";
import { DiaSemana } from "./DiaSemana";
import { Plan } from "./Plan";

export class Horario {

    public id: number;
    public hora: HoraDia;
    public dia: DiaSemana;

    public plan: Plan;

    public constructor() {

        this.id = null;
        this.hora = null;
        this.dia = null;

    }

}