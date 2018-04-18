import { Component, Input } from "@angular/core";
import { Cliente } from "../../../../models/Cliente";
import { ClienteService } from "../../../../services/cliente.service";
import { Contrato } from "../../../../models/Contrato";
import { ContratoService } from "../../../../services/contrato.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'inscripcionplan',
    templateUrl: 'inscripcionplan.html',
    providers: [ClienteService, ContratoService]
})
export class InscripcionPlanComponent {

    @Input()
    public plan_id: number;

    public clientes: Cliente[];
    private clientesPorNombre: any;

    // Datos para el componente autocomplete
    private autocompleteInit: any;

    // Cliente seleccionado para inscribir a algun plan
    private cliente: Cliente;

    private archivo: any;
    
    public constructor(
        private _clienteService: ClienteService,
        private _contratoService: ContratoService
    ) {

        this.autocompleteInit = {};
        this.autocompleteInit.data = {};
        this.autocompleteInit.onAutocomplete = (nombre:string) => this.seleccionar(nombre);
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

    public seleccionar(nombre:string) {
        this.cliente = this.clientesPorNombre[nombre];
    }

    public seleccionarArchivo(event:any) {
        this.archivo = event.target.files[0];
    }

    public inscribir() {
        // Inscribir cliente al plan
        if ( this.cliente != null && this.archivo != null ) {
            // Inscribir al cliente: this.clienteSeleccionado
            let contrato: Contrato = new Contrato();

            contrato.tgf_cliente_id = this.cliente.id;
            contrato.tgf_plan_id = this.plan_id;

            this._contratoService.save(contrato, this.archivo).subscribe(
                Response => {
                    
                },
                error => {

                }
            );

        }

    }

}