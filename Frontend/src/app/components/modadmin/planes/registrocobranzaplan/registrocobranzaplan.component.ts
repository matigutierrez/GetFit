import { Component, ViewChild, ElementRef, EventEmitter, AfterViewChecked } from "@angular/core";
import { Plan } from "../../../../models/Plan";
import { MaterializeAction } from "angular2-materialize";
import { Cliente } from "../../../../models/Cliente";
import { Contrato } from "../../../../models/Contrato";
import { Cobranza } from "../../../../models/Cobranza";
import { ClienteService } from "../../../../services/cliente.service";
import { CobranzaService } from "../../../../services/cobranza.service";
import { ContratoService } from "../../../../services/contrato.service";
import { PlanService } from "../../../../services/plan.service";

declare var Materialize: any;

@Component({
    selector: 'registrocobranzaplan',
    templateUrl: 'registrocobranzaplan.html'
})
export class RegistroCobranzaPlanComponent implements AfterViewChecked {

    // El plan en el cual se está trabajando
    public plan: Plan;

    // Modal del componente
    public modal = new EventEmitter<string | MaterializeAction>();

    // Lista de contratos
    public contratos: Contrato[];

    // Mapeo de contratos por nombre y apellido de cliente
    private contratosPorNombre: any;

    // Datos para el componente autocomplete
    private autocompleteInit: any;

    // Contrato seleccionado para cobrar
    private contrato: Contrato;

    // Cobranza a registrar
    public cobranza: Cobranza = new Cobranza();

    public constructor(
        private _clienteService: ClienteService,
        private _cobranzaService: CobranzaService,
        private _contratoService: ContratoService,
        private _planService: PlanService
    ) {

        // Inicializar autocomplete
        this.autocompleteInit = {};
        this.autocompleteInit.data = {};
        this.autocompleteInit.onAutocomplete = (nombre: string) => this.seleccionar(nombre);
        this.contratosPorNombre = {};

    }

    public ngAfterViewChecked() {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    public limpiar(): void {
        this.contrato = null;
        this.contratos = null;
        this.cobranza = new Cobranza();
    }

    public seleccionar(nombre: string) {
        // Al seleccionar un contrato del autocomplete
        this.contrato = this.contratosPorNombre[nombre];

        if (this.contrato) {
            // Actualizar id de contrato
            this.cobranza.tgf_contrato_id = this.contrato.id;

            // Actualizar monto
            this.cobranza.cob_monto = this.contrato.plan.pla_costo;
        }
    }

    public abrir(plan: Plan) {
        // Guardar el plan
        this.plan = plan;

        // Limpiar autocomplete
        this.autocompleteInit.data = {};
        this.contratosPorNombre = {};

        // Obtener contratos del plan
        this._planService.getContratos(this.plan).subscribe(
            Response => {
                // Guardar contratos
                this.contratos = Response;

                for (let i = 0; i < this.contratos.length; i++) {
                    // Por cada cliente
                    let contrato: Contrato = this.contratos[i];
                    let cliente: Cliente = contrato.cliente;
                    let nombre: string = cliente.cli_nombres + " " + cliente.cli_apellidos;

                    // Agregar a autocomplete y referenciar por nombre
                    this.autocompleteInit.data[nombre] = null;
                    this.contratosPorNombre[nombre] = contrato;
                }

            }
        );

        // Limpiar vista
        this.limpiar();

        // Abrir modal
        this.modal.emit({ action: "modal", params: ['open'] });
    }

    public cerrar() {
        this.modal.emit({ action: "modal", params: ['close'] });
    }

    public onSubmit() {
        // Al emitir una cobranza

        // Validar contrato
        if (this.cobranza.tgf_contrato_id != null && this.cobranza.cob_monto != null) {

            // Guardar cobranza
            this._cobranzaService.save(this.cobranza).subscribe(
                Response => {

                    // Cerrar modal
                    this.cerrar();

                    // Eliminar datos de formulario
                    this.limpiar();
                },
                error => {
                    console.error(error);
                }
            );

        }

    }

}