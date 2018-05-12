export class MetodoPago {

    public id: number;
    public mep_nombre: string;

    public constructor() {

        this.id = null;
        this.mep_nombre = null;

    }

    public static getJSON(metodoPago: MetodoPago): any {
        return {
            id: metodoPago.id,
            mep_nombre: metodoPago.mep_nombre
        };
    }

}