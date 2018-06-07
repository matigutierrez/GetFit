import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GLOBAL } from './global';
import { Cliente } from '../models/Cliente';
import { Plan } from '../models/Plan';
import { Contrato } from '../models/Contrato';
import { SolicitudPlan } from '../models/SolicitudPlan';
import { Cobranza } from '../models/Cobranza';
import { CobranzaHistorica } from '../models/CobranzaHistorica';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    public constructor(
        private _http: HttpClient
    ) {

    }

    public save(cliente: Cliente): Observable<number> {
        return this._http.post<number>(GLOBAL.url + 'cliente', Cliente.getJSON(cliente));
    }

    public update(cliente: Cliente): Observable<any> {
        return this._http.put(GLOBAL.url + 'cliente/' + cliente.id, Cliente.getJSON(cliente));
    }

    public query(): Observable<Cliente[]> {
        return this._http.get<Cliente[]>(GLOBAL.url + 'cliente')
            .pipe(map(clientes => clientes.map(cliente => new Cliente(cliente))));
    }

    public get(id: number): Observable<Cliente> {
        return this._http.get<Cliente>(GLOBAL.url + 'cliente/' + id)
            .pipe(map(cliente => new Cliente(cliente)));
    }

    public delete(id: number): Observable<any> {
        return this._http.delete(GLOBAL.url + 'cliente/' + id);
    }

    public getSolicitudesToken(): Observable<SolicitudPlan[]> {
        return this._http.get<SolicitudPlan[]>(GLOBAL.url + 'clientesolicitudes')
            .pipe(map(solicitudes => solicitudes.map(solicitud => new SolicitudPlan(solicitud))));
    }

    public getContratos(cliente: Cliente): Observable<Contrato[]> {
        return this._http.get<Contrato[]>(GLOBAL.url + 'cliente/' + cliente.id + '/contratos')
            .pipe(map(contratos => contratos.map(contrato => new Contrato(contrato))));
    }

    public getCobranzas(cliente: Cliente): Observable<Cobranza[]> {
        return this._http.get<Cobranza[]>(GLOBAL.url + 'cliente/' + cliente.id + '/cobranzas')
            .pipe(map(cobranzas => cobranzas.map(cobranza => new Cobranza(cobranza))));
    }

    public getCobranzasHistoricas(cliente: Cliente): Observable<CobranzaHistorica[]> {
        return this._http.get<CobranzaHistorica[]>(GLOBAL.url + 'cliente/' + cliente.id + '/cobranzashistoricas')
            .pipe(map(cobranzasHistoricas => cobranzasHistoricas.map(cobranzaHistorica => new CobranzaHistorica(cobranzaHistorica))));
    }

}