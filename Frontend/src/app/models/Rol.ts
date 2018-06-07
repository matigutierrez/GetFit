export class Rol {

    public id: number;
    public rol_nombre: string;
    public rol_descripcion: string;

    public constructor(json?: any) {

        Object.assign(this, json);

    }

    public static getJSON(rol: Rol): any {
        return {
            id: rol.id,
            rol_nombre: rol.rol_nombre,
            rol_descripcion: rol.rol_descripcion
        };
    }

}