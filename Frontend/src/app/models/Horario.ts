import { HoraDia } from "./HoraDia";
import { DiaSemana } from "./DiaSemana";

export class Horario {

    public id: number;
    public hora: HoraDia;
    public dia: DiaSemana;

    public constructor() {

        this.id = null;
        this.hora = null;
        this.dia = null;

    }

}