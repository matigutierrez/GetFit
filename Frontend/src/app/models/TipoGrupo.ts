export class TipoGrupo {

    public id: number;
    public tgr_nombre: string;
    public tgr_color: string;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(tipoGrupo: TipoGrupo) {
        return {
            id: tipoGrupo.id,
            tgr_nombre: tipoGrupo.tgr_nombre,
            tgr_color: tipoGrupo.tgr_color
        }
    }

}