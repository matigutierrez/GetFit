import { Component, EventEmitter, OnInit, Input, Output, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { CobranzaService } from '../../../../services/cobranza.service';
import { ContratoService } from '../../../../services/contrato.service';
import { MaterializeAction } from 'angular2-materialize';
import { Cliente } from '../../../../models/Cliente';
import { Contrato } from '../../../../models/Contrato';
import { ClienteService } from '../../../../services/cliente.service';
import { Cobranza } from '../../../../models/Cobranza';
import { CobranzaHistorica } from '../../../../models/CobranzaHistorica';
import { CobranzaHistoricaService } from '../../../../services/cobranzahistorica.service';
declare var $: any;
declare var jQuery: any;

declare var Materialize: any;

@Component({
  selector: 'registrocobranza',
  templateUrl: 'registrocobranza.html',
  providers: [ClienteService, CobranzaService, ContratoService]
})

export class RegistroCobranzaComponent implements OnInit, AfterViewChecked {

  @ViewChild("cliente")
  public clienteInput: ElementRef;

  // Modal del componente
  public modal = new EventEmitter<string | MaterializeAction>();

  // Lista de clientes
  public clientes: Cliente[];

  // Lista de contratos
  public contratos: Contrato[];

  // Mapeo de clientes por nombre y apellido
  private clientesPorNombre: any;

  // Datos para el componente autocomplete
  private autocompleteInit: any;

  // Cliente seleccionado para cobrar
  private cliente: Cliente;

  // Cobranza a registrar
  public cobranzaHistorica: CobranzaHistorica = new CobranzaHistorica();

  public constructor(
    private _clienteService: ClienteService,
    private _cobranzaService: CobranzaService,
    private _cobranzaHistoricaService: CobranzaHistoricaService,
    private _contratoService: ContratoService
  ) {

    this.autocompleteInit = {};
    this.autocompleteInit.data = {};
    this.autocompleteInit.onAutocomplete = (nombre: string) => this.seleccionar(nombre);
    this.clientesPorNombre = {};

    // Solicitar lista de clientes
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

  public ngOnInit() {
    //console.log('el componente registro-cobranza ha sido cargado');
  }

  public ngAfterViewChecked() {
    if (Materialize.updateTextFields) {
      Materialize.updateTextFields();
    }
  }

  public limpiar(): void {

    this.cliente = null;
    this.contratos = null;
    this.cobranzaHistorica = new CobranzaHistorica();
    this.clienteInput.nativeElement.value = "";

  }

  public seleccionar(nombre: string) {
    // Al seleccionar un cliente del autocomplete
    this.cliente = this.clientesPorNombre[nombre];
    this.contratos = null;

    if (this.cliente) {

      // Obtener contratos del cliente
      this._clienteService.getContratos(this.cliente).subscribe(
        Response => {
          this.contratos = Response;
        },
        error => {
          console.error(error);
        }
      )

    }

  }

  public onChangeContrato() {
    // Al cambiar contrato

    // Actualizar id de contrato
    this.cobranzaHistorica.tgf_contrato_historico_id = this.cobranzaHistorica.contrato_historico.id;

    // Actualizar monto
    this.cobranzaHistorica.cob_monto = this.cobranzaHistorica.contrato_historico.plan.pla_costo;
  }

  public onSubmit() {
    // Al emitir una cobranza

    // Validar contrato
    if (this.cobranzaHistorica.tgf_contrato_historico_id != null && this.cobranzaHistorica.cob_monto != null) {

      // Guardar cobranza
      this._cobranzaHistoricaService.save(this.cobranzaHistorica).subscribe(
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

  public abrir() {
    // Eliminar datos de formulario
    this.limpiar();

    // Abrir modal
    this.modal.emit({ action: "modal", params: ['open'] });
  }

  public cerrar() {
    this.modal.emit({ action: "modal", params: ['close'] });
  }

}