import { Component, EventEmitter, Input } from "@angular/core";
import { MaterializeAction } from 'angular2-materialize';
import { Cliente } from "../../../../models/Cliente";
import { ClienteService } from "../../../../services/cliente.service";
import { HttpEventType } from "@angular/common/http";
import { Grupo } from "../../../../models/Grupo";
import { ContratoHistorico } from "../../../../models/ContratoHistorico";
import { ContratoHistoricoService } from "../../../../services/contratohistorico.service";

@Component({
    selector: 'inscripciongrupo',
    templateUrl: 'inscripciongrupo.html'
})
export class InscripcionGrupoComponent {

    // El grupo al cual se inscribirá el cliente
    public grupo: Grupo;

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Lista de clientes
    public clientes: Cliente[];

    // Mapeo de clientes por nombre y apellido
    private clientesPorNombre: any;

    // Datos para el componente autocomplete
    private autocompleteInit: any;

    // Cliente seleccionado para inscribir a algun grupo
    private cliente: Cliente;

    // El archivo del acta
    private archivo: any;

    // Se envió la inscripcion del acta?
    public sent: boolean;

    // Error al enviar la inscripcion?
    public sentError: boolean;

    // Porcentaje de subida del acta
    public porcentaje: number;

    // Esperando respuesta del servidor
    public esperar: boolean;

    public constructor(
        private _clienteService: ClienteService,
        private _contratoHistoricoService: ContratoHistoricoService
    ) {

        this.autocompleteInit = {};
        this.autocompleteInit.data = {};
        this.autocompleteInit.onAutocomplete = (nombre: string) => this.seleccionar(nombre);
        this.clientesPorNombre = {};

        this._clienteService.query().subscribe(
            Response => {
                this.clientes = Response;
                this.autocompleteInit.data = {};
                this.clientesPorNombre = {};

                for (let i = 0; i < this.clientes.length; i++) {
                    // Por cada cliente
                    let cliente: Cliente = this.clientes[i];
                    let nombre: string = cliente.cli_nombres + " " + cliente.cli_apellidos;

                    // Agregar a autocomplete y referenciar por nombre
                    this.autocompleteInit.data[nombre] = null;
                    this.clientesPorNombre[nombre] = cliente;
                }
            },
            error => {
                console.error(error);
            }
        );

    }

    public seleccionar(nombre: string) {
        this.cliente = this.clientesPorNombre[nombre];
    }

    public seleccionarArchivo(event: any) {
        this.archivo = event.target.files[0];
    }

    public inscribir() {
        // Inscribir cliente al grupo
        if (this.cliente != null) {
            // Inscribir al cliente: this.clienteSeleccionado
            let contratoHistorico: ContratoHistorico = new ContratoHistorico();

            contratoHistorico.tgf_cliente_id = this.cliente.id;
            contratoHistorico.tgf_grupo_id = this.grupo.id;

            this.sent = false;
            this.sentError = false;
            this.esperar = false;
            this.porcentaje = 0;

            // Crear contrato
            this._contratoHistoricoService.save(contratoHistorico, this.archivo).subscribe(
                Event => {

                    if (Event.type == HttpEventType.Sent) {

                        this.sent = true;
                        this.porcentaje = 0;

                    } else if (Event.type == HttpEventType.UploadProgress) {

                        this.porcentaje = 100 * Event.loaded / Event.total;

                        if (this.porcentaje >= 100) {
                            // Esperar que el servidor responda
                            this.esperar = true;
                        }

                    } else if (Event.type == HttpEventType.Response) {

                        this.sent = false;
                        this.esperar = false;
                        this.porcentaje = 0;

                        this.cerrar();

                    }

                },
                error => {
                    this.sentError = true;
                    this.sent = false;
                    this.esperar = false;
                    this.porcentaje = 0;
                }
            );

        }

    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public abrir(grupo: Grupo) {
        this.grupo = grupo;
        this.sent = false;
        this.sentError = false;
        this.esperar = false;
        this.porcentaje = 0;
        this.modal.emit({ action: "modal", params: ['open'] });
    }

}