export class DiaSemana {

    public id: number;
    public dia_nombre: string;

    public constructor(json?: any) {
        
        Object.assign(this, json);

    }

    public static getJSON(dia: DiaSemana): any {
        return {
            id: dia.id,
            dia_nombre: dia.dia_nombre
        };
    }

}