export class Rol {

    public id:number;
    public rol_nombre:string;
    public rol_descripcion:string;

    public constructor() {
        this.id = null;
        this.rol_nombre = null;
        this.rol_descripcion = null;
    }

    public static getJSON(rol: Rol): any {
        return {
            id: rol.id,
            rol_nombre: rol.rol_nombre,
            rol_descripcion: rol.rol_descripcion
        };
    }

}