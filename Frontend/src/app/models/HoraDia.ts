export class HoraDia {

    public id: number;
    public hor_inicio: string;
    public hor_fin: string;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(hora: HoraDia): any {
        return {
            id: hora.id,
            hor_inicio: hora.hor_inicio,
            hor_fin: hora.hor_fin
        };
    }

}