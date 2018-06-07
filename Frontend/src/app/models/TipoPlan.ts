export class TipoPlan {

    public id: number;
    public tpl_nombre: string;
    public tpl_color: string;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(tipoPlan: TipoPlan) {
        return {
            id: tipoPlan.id,
            tpl_nombre: tipoPlan.tpl_nombre,
            tpl_color: tipoPlan.tpl_color
        }
    }

}