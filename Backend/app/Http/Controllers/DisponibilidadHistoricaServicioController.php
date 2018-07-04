<?php

namespace App\Http\Controllers;

use App\DisponibilidadServicio;
use App\DisponibilidadHistoricaServicio;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;
use Carbon\Carbon;

class DisponibilidadHistoricaServicioController extends Controller
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
        return DisponibilidadHistoricaServicio::all();
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
        $disponibilidadHist = new DisponibilidadHistoricaServicio;
        $disponibilidadHist->tgf_servicio_id = $request->tgf_servicio_id;
        $disponibilidadHist->dse_fecha_inicio = Carbon::parse($request->dse_fecha_inicio)->toDateTimeString();
        $disponibilidadHist->dse_fecha_fin = Carbon::parse($request->dse_fecha_fin)->toDateTimeString();

        $disponibilidadHist->save();

        // Cachear servicio
        $disponibilidadHist->servicio;

        $this->pusher->trigger('disponibilidadHistoricaServicio', 'create', $disponibilidadHist);

        // Crear disponibilidad
        $disponibilidad = new DisponibilidadServicio;
        $disponibilidad->tgf_disponibilidad_historica_servicio_id = $disponibilidadHist->id;

        $disponibilidad->save();

        // Cachear disponibilidad histórica
        $disponibilidad->disponibilidad_historica_servicio;

        $this->pusher->trigger('disponibilidadServicio', 'create', $disponibilidad);
        
        return $disponibilidadHist->id;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DisponibilidadHistoricaServicio::find($id);
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
        $disponibilidad = DisponibilidadHistoricaServicio::find($id);
        $disponibilidad->update([
            'tgf_servicio_id' => $request->tgf_servicio_id,
            'dse_fecha_inicio' => Carbon::parse($request->dse_fecha_inicio)->toDateTimeString(),
            'dse_fecha_fin' => Carbon::parse($request->dse_fecha_fin)->toDateTimeString()
        ]);

        // Cachear servicio
        $disponibilidad->servicio;

        $this->pusher->trigger('disponibilidadHistoricaServicio', 'update', $disponibilidad);

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
        // Este registro no debe poder eliminarse
    }

    /**
     * Obtener las solicitudes historicas para una disponibilidad de servicio
     * 
     */
    public function solicitudesHistoricas($id) {
        return DisponibilidadHistoricaServicio::find($id)->solicitudes_historicas;
    }

    /**
     * Obtener las solicitudes para una disponibilidad de servicio
     * 
     */
    public function solicitudes($id) {
        return DisponibilidadHistoricaServicio::find($id)->solicitudes;
    }

}
