export class Pago {

    public id: number;

    public constructor() {

        this.id = null;

    }
    
    public static getJSON(pago: Pago): any {
        return {
            id: pago.id
        };
    }

}