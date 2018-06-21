import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SedeService } from '../../../../services/sede.service';
import { Sede } from '../../../../models/Sede';
import { RegistroSedeComponent } from '../registrosede/registrosede.component';
import { PusherService } from '../../../../services/pusher.service';
import { EliminarSedeComponent } from '../eliminarsede/eliminarsede.component';

declare var Materialize: any;

@Component({
    selector: 'sedes',
    templateUrl: 'sedes.html'
})
export class SedesComponent implements OnDestroy {

    // Componente para registrar sedes
    @ViewChild(RegistroSedeComponent)
    public registroSedeComponent: RegistroSedeComponent;

    // Componente para eliminar sedes
    @ViewChild(EliminarSedeComponent)
    public eliminarSedeComponent: EliminarSedeComponent;

    // Lista de sedes
    public sedes: Sede[];

    // Pagina actual
    public p: number = 1;

    // Canal de sedes
    private sedeChannel: any;

    public constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _sedeService: SedeService,
        private _pusherService: PusherService
    ) {

        // Solicitar lista de sedes a backend
        this._sedeService.query().subscribe(
            Response => {
                this.sedes = Response;
            }
        );

        // Pusher
        this.sedeChannel = this._pusherService.getPusher().subscribe('sede');
        this.sedeChannel.bind("create", data => { this.onCreateSede(new Sede(data)) });
        this.sedeChannel.bind("update", data => { this.onUpdateSede(new Sede(data)) });
        this.sedeChannel.bind("delete", data => { this.onDeleteSede(data) });

    }

    public ngOnDestroy() {
        if (this.sedeChannel) {
            this.sedeChannel.unbind();
        }
    }

    public onCreateSede(sede: Sede) {
        // Si se ha recibido la lista de sedes
        if (this.sedes) {
            // Agregar nueva sede
            this.sedes.push(sede);

            // Indicar que se ha registrado la sede
            Materialize.toast('Se ha registrado la sede "' + sede.sed_nombre + '" al sistema', 3000);
        }
    }

    public onUpdateSede(sede: Sede) {
        // Si se ha recibido la lista de sedes
        if (this.sedes) {
            // Por cada sede
            for (let i = 0; i < this.sedes.length; i++) {
                // Si los IDs coinciden
                if (this.sedes[i].id == sede.id) {
                    // Reemplazar sede
                    this.sedes[i] = sede;
                    break;
                }
            }
        }
    }

    public onDeleteSede(id: number) {
        // Si se ha recibido la lista de sedes
        if (this.sedes) {
            // Por cada sede
            for (let i = 0; i < this.sedes.length; i++) {
                // Si los IDs coinciden
                if (this.sedes[i].id == id) {
                    // Quitar sede de la lista
                    this.sedes.splice(i, 1);
                    break;
                }
            }
        }
    }

    public registrarSede() {
        this.registroSedeComponent.abrir();
    }

    public deleteSede(sede: Sede) {
        this.eliminarSedeComponent.abrir(sede);
    }

}