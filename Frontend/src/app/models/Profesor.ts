import { Usuario } from "./Usuario";

export class Profesor {

    public id: number;
    public pro_rut: string;
    public pro_nombres: string;
    public pro_apellidos: string;
    public pro_numerotelefonico: string;
    public pro_direccion: string;

    public usuario: Usuario;

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.usuario) { this.usuario = new Usuario(this.usuario) };

    }

    public static getJSON(profesor: Profesor): any {
        return {
            id: profesor.id,
            pro_rut: profesor.pro_rut,
            pro_nombres: profesor.pro_nombres,
            pro_apellidos: profesor.pro_apellidos,
            pro_numerotelefonico: profesor.pro_numerotelefonico,
            pro_direccion: profesor.pro_direccion
        };
    }

}