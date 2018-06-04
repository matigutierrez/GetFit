import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlanService } from '../../../../services/plan.service';
import { MaterializeAction } from 'angular2-materialize';
import { Plan } from '../../../../models/Plan';
import { Cliente } from '../../../../models/Cliente';
import { PusherService } from '../../../../services/pusher.service';
import { GLOBAL } from '../../../../services/global';
import { Contrato } from '../../../../models/Contrato';
import { InscripcionPlanComponent } from '../inscripcionplan/inscripcionplan.component';
import { RegistroPlanComponent } from '../registroplan/registroplan.component';
import { HorarioComponent } from '../../../extra/horario/horario.component';
import { Horario } from '../../../../models/Horario';
import { ContratosComponent } from '../../clientes/contratos/contratos.component';

@Component({
  selector: 'planes',
  templateUrl: 'planes.html',
  providers: [PlanService]
})

export class PlanesComponent implements OnInit {

  @ViewChild(ContratosComponent)
  public contratosComponent: ContratosComponent;

  @ViewChild(RegistroPlanComponent)
  public registroPlan: RegistroPlanComponent;

  @ViewChild(InscripcionPlanComponent)
  public inscripcionPlanComponent: InscripcionPlanComponent;

  @ViewChild(HorarioComponent)
  public horario: HorarioComponent;

  // Lista de planes
  public planes: Plan[];
  public modalCreate = new EventEmitter<string | MaterializeAction>();
  public parametros: string;

  // Lista de contratos
  public contratos: Contrato[] = [];

  // Pagina actual
  public p: number = 1;

  private channel: any;
  private contratoChannel: any;

  public constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _pusherService: PusherService
  ) {

    // Solicitar planes al backend
    this._planService.query().subscribe(
      Response => {

        // Guardar lista de planes
        this.planes = Response;

        // Para cada plan
        for (let i = 0; i < this.planes.length; i++) {

          let plan: Plan = this.planes[i];
          
          // Para los contratos del plan
          let contratos: Contrato[] = plan.contratos;

          // Si hay contratos
          if (contratos && contratos.length > 0) {

            // Para cada contrato
            for (let i = 0; i < contratos.length; i++) {

              // Contrato debe contener al plan
              contratos[i].contrato_historico.plan = plan;

            }

          }

        }

      },
      Error => {
        console.log(<any>Error)
      }
    );

    this.channel = this._pusherService.getPusher().subscribe('plan');
    this.channel.bind('create', data => { this.onCreate(data) });
    this.channel.bind('update', data => { this.onUpdate(data) });
    this.channel.bind('delete', data => { this.onDelete(data) });

    this.contratoChannel = this._pusherService.getPusher().subscribe('contrato');
    this.contratoChannel.bind('create', data => { this.onCreateContrato(data) });
    this.contratoChannel.bind('update', data => { this.onUpdateContrato(data) });
    this.contratoChannel.bind('delete', data => { this.onDeleteContrato(data) });

  }

  public ngOnInit() {
    //console.log('el componente plan ha sido cargado');
  }

  public abrirHorarios(plan: Plan) {
    this.horario.abrir([plan]);
  }

  public abrirContratos(contratos: Contrato[]) {
    this.contratos = contratos;
    this.contratosComponent.abrir();
  }

  public deletePlan(id: number) {
    this._planService.delete(id).subscribe(null);
  }

  public onCreate(plan: Plan) {

    // Para los contratos del plan
    let contratos: Contrato[] = plan.contratos;

    // Si hay contratos
    if (contratos && contratos.length > 0) {

      // Para cada contrato
      for (let i = 0; i < contratos.length; i++) {

        // Contrato debe contener al plan
        contratos[i].contrato_historico.plan = plan;

      }

    }

    // Agregar plan a la lista
    this.planes.unshift(plan);
  }

  public onUpdate(plan: Plan) {
    if (this.planes) {

      // Para los contratos del plan
      let contratos: Contrato[] = plan.contratos;

      // Si hay contratos
      if (contratos && contratos.length > 0) {

        // Para cada contrato
        for (let i = 0; i < contratos.length; i++) {

          // Contrato debe contener al plan
          contratos[i].contrato_historico.plan = plan;

        }

      }

      // Para cada plan
      for (let i = 0; i < this.planes.length; i++) {

        // Buscar plan cuyo id coincida
        if (this.planes[i].id == plan.id) {

          // Actualizar el plan
          this.planes[i] = plan;
          break;

        }

      }

    }
  }

  public onDelete(id: number) {
    if (this.planes) {

      // Para cada plan
      for (let i = 0; i < this.planes.length; i++) {

        // Si hay un plan cuyo id coincida
        if (this.planes[i].id == id) {

          // Eliminar el plan
          this.planes.splice(i, 1);
          break;

        }

      }

    }
  }

  public onCreateContrato(contrato: Contrato) {
    if (this.planes) {

      // Para cada plan
      for (let i = 0; i < this.planes.length; i++) {

        let plan: Plan = this.planes[i];

        // Si hay un plan al que pertenezca el contrato
        if (plan.id == contrato.tgf_plan_id) {

          // Agregar contrato al plan
          plan.contratos.unshift(contrato);

          // Contrato debe contener al plan
          contrato.contrato_historico.plan = plan;

        }

      }

    }
  }

  public onUpdateContrato(contrato: Contrato) {
    if (this.planes) {

      // Para cada plan
      for (let i = 0; i < this.planes.length; i++) {

        let plan: Plan = this.planes[i];

        // Si hay un plan al que pertenezca el contrato
        if (plan.id == contrato.tgf_plan_id) {

          // Contrato debe contener al plan
          contrato.contrato_historico.plan = plan;

          let contratos: Contrato[] = plan.contratos;

          // Para cada contrato
          for (let j = 0; j < contratos.length; j++) {

            // Si hay un contrato cuyo id coincida
            if (contratos[j].id == contrato.id) {

              contratos[j] = contrato;
              break;

            }
          }

          break;
        }
      }
    }
  }

  public onDeleteContrato(id: number) {
    if (this.planes) {

      // Para cada plan
      for (let i = 0; i < this.planes.length; i++) {

        let plan: Plan = this.planes[i];

        // Para cada contrato del plan
        for (let j = 0; j < plan.contratos.length; j++) {

          // Buscar contrato cuyo id coincida
          if (plan.contratos[j].id == id) {

            // Eliminar contrato
            plan.contratos.splice(j, 1);
            break;

          }

        }

      }

    }
  }

}