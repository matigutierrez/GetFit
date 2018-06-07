import { Usuario } from "./Usuario";

export class Notificacion {

    public id: number;
    public not_titulo: string;
    public not_contenido: string;

    public usuarios: Usuario[];

    public constructor(json?: any) {

        Object.assign(this, json);

        if (this.usuarios) { this.usuarios = this.usuarios.map(usuario => new Usuario(usuario)) };

    }

    public static getJSON(notificacion: Notificacion): any {
        return {
            id: notificacion.id,
            not_titulo: notificacion.not_titulo,
            not_contenido: notificacion.not_contenido
        };
    }

}