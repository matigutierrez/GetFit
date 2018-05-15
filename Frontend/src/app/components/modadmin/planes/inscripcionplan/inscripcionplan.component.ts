import { Component, EventEmitter, Input } from "@angular/core";
import { MaterializeAction } from 'angular2-materialize';
import { Cliente } from "../../../../models/Cliente";
import { ClienteService } from "../../../../services/cliente.service";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { HttpHeaders, HttpEventType } from "@angular/common/http";

@Component({
    selector: 'inscripcionplan',
    templateUrl: 'inscripcionplan.html',
    providers: [ClienteService, ContratoService]
})
export class InscripcionPlanComponent {

    // Id del plan al cual se inscribirá un cliente
    public plan_id: number;

    // Modal del componente
    public modalInscripcionPlan = new EventEmitter<string | MaterializeAction>();

    // Lista de clientes
    public clientes: Cliente[];

    // Mapeo de clientes por nombre y apellido
    private clientesPorNombre: any;

    // Datos para el componente autocomplete
    private autocompleteInit: any;

    // Cliente seleccionado para inscribir a algun plan
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
        private _contratoService: ContratoService
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
        // Inscribir cliente al plan
        if (this.cliente != null) {
            // Inscribir al cliente: this.clienteSeleccionado
            let contrato: Contrato = new Contrato();

            contrato.tgf_cliente_id = this.cliente.id;
            contrato.tgf_plan_id = this.plan_id;

            this.sent = false;
            this.sentError = false;
            this.esperar = false;
            this.porcentaje = 0;

            // Crear contrato
            this._contratoService.save(contrato, this.archivo).subscribe(
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
        this.modalInscripcionPlan.emit({ action: "modal", params: ['close'] });
    }

    public abrir(plan_id: number) {
        this.plan_id = plan_id;
        this.sent = false;
        this.sentError = false;
        this.esperar = false;
        this.porcentaje = 0;
        this.modalInscripcionPlan.emit({ action: "modal", params: ['open'] });
    }

}