export class MetodoPago {

    public id: number;
    public mep_nombre: string;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(metodoPago: MetodoPago): any {
        return {
            id: metodoPago.id,
            mep_nombre: metodoPago.mep_nombre
        };
    }

}