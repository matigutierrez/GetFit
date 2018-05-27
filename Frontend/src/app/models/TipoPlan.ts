export class TipoPlan {

    public id: number;
    public tpl_nombre: string;
    public tpl_color: string;

    public constructor() {

        this.id = null;
        this.tpl_nombre = null;
        this.tpl_color = null;

    }

    public static getJSON(tipoPlan: TipoPlan) {
        return {
            id: tipoPlan.id,
            tpl_nombre: tipoPlan.tpl_nombre,
            tpl_color: tipoPlan.tpl_color
        }
    }

}