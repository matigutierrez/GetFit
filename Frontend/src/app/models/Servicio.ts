export class Servicio {

    public id: number;

    public ser_nombre: string;
    public ser_descripcion: string;
    public ser_costo: number;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(servicio: Servicio) {
        return {
            id: servicio.id,
            ser_nombre: servicio.ser_nombre,
            ser_descripcion: servicio.ser_descripcion,
            ser_costo: servicio.ser_costo
        }
    }

}