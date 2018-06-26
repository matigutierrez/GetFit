<?php

namespace App\Http\Controllers;

use App\DisponibilidadServicio;
use App\SolicitudServicio;
use App\SolicitudServicioHistorica;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;
use Carbon\Carbon;

class SolicitudServicioHistoricaController extends Controller
{

    private $pusher;

    public function __construct(PusherManager $pusher) {
        $this->pusher = $pusher;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SolicitudServicioHistorica::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $solicitudHist = new SolicitudServicioHistorica;
        $solicitudHist->tgf_disponibilidad_servicio_id = $request->tgf_disponibilidad_servicio_id;
        $solicitudHist->tgf_cliente_id = $request->tgf_cliente_id;
        $solicitudHist->sse_fecha_inicio = Carbon::parse($request->sse_fecha_inicio)->toDateTimeString();
        $solicitudHist->sse_fecha_fin = Carbon::parse($request->sse_fecha_fin)->toDateTimeString();

        // Guardar solicitud historica en base de datos
        $solicitudHist->save();

        // Cachear disponibilidad de servicio y cliente
        $solicitudHist->disponibilidad_servicio;
        $solicitudHist->cliente;

        // Enviar por pusher
        $this->pusher->trigger('solicitudServicioHistorica', 'create', $solicitudHist);

        $solicitud = new SolicitudServicio;
        $solicitud->tgf_solicitud_servicio_historica_id = $solicitudHist->id;
        $solicitud->tgf_disponibilidad_servicio_id = $solicitudHist->tgf_disponibilidad_servicio_id;

        // Guardar solicitud en base de datos
        $solicitud->save();

        // Cachear solicitud historica
        $solicitud->solicitud_servicio_historica;

        // Enviar por pusher
        $this->pusher->trigger('solicitudServicio', 'create', $solicitud);

        return $solicitudHist->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SolicitudServicioHistorica::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $solicitudHist = SolicitudServicioHist::find($id);
        $solicitudHist->update($request->all());

        // Cachear disponibilidad de servicio y cliente
        $solicitudHist->disponibilidad_servicio;
        $solicitudHist->cliente;

        // Enviar por pusher
        $this->pusher->trigger('solicitudServicioHistorica', 'update', $solicitudHist);

        // Obtener solicitud de servicio
        $solicitud = $solicitudHist->solicitud_servicio;

        if ( isset($solicitud) ) {
            // Si existe solicitud, actualizar su 'tgf_disponibilidad_servicio_id'
            $solicitud->tgf_disponibilidad_servicio_id = $solicitudHist->tgf_disponibilidad_servicio_id;
            $solicitud->save();

            // Cachear solicitud historica
            $solicitud->solicitud_servicio_historica;

            // Enviar por pusher
            $this->pusher->trigger('solicitudServicio', 'update', $solicitud);
        }

        return ['updated' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Solicitudes historicas no deben eliminarse
    }

    /**
     * Crea una solicitud historica de servicio para el cliente
     * 
     */
    public function solicitar(Request $request, AuthenticateController $auth) {

        // Buscar disponibilidad de servicio
        $disponibilidad = DisponibilidadServicio::find($request->tgf_disponibilidad_servicio_id);

        // Validar que la fecha actual se encuentra entre '$disponibilidad->dse_fecha_inicio' y '$disponibilidad->dse_fecha_fin'

        $solicitud = new SolicitudServicioHist;
        $solicitud->tgf_disponibilidad_servicio_id = $request->tgf_disponibilidad_servicio_id;
        $solicitud->tgf_cliente_id = $auth->getAuthenticatedUser()->cliente->id;
        $solicitudHist->sse_fecha_inicio = Carbon::parse($request->sse_fecha_inicio)->toDateTimeString();
        $solicitudHist->sse_fecha_fin = Carbon::parse($request->sse_fecha_fin)->toDateTimeString();

        // Guardar solicitud historica en base de datos
        $solicitudHist->save();

        // Cachear disponibilidad de servicio y cliente
        $solicitudHist->disponibilidad_servicio;
        $solicitudHist->cliente;

        // Enviar por pusher
        $this->pusher->trigger('solicitudServicioHistorica', 'create', $solicitudHist);

        $solicitud = new SolicitudServicio;
        $solicitud->tgf_solicitud_servicio_historica_id = $solicitudHist->id;
        $solicitud->tgf_disponibilidad_servicio_id = $solicitudHist->tgf_disponibilidad_servicio_id;

        // Guardar solicitud en base de datos
        $solicitud->save();

        // Cachear solicitud historica
        $solicitud->solicitud_servicio_historica;

        // Enviar por pusher
        $this->pusher->trigger('solicitudServicio', 'create', $solicitud);

        return $solicitudHist->id;
    }

}
