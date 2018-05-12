export class DiaSemana {

    public id: number;
    public dia_nombre: string;

    public constructor() {
        
        this.id = null;
        this.dia_nombre = null;

    }

    public static getJSON(dia: DiaSemana): any {
        return {
            id: dia.id,
            dia_nombre: dia.dia_nombre
        };
    }

}