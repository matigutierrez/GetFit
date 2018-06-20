<?php

namespace App\Http\Controllers;

use App\CobranzaServicio;
use App\CobranzaHistoricaServicio;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class CobranzaHistoricaServicioController extends Controller
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
        return CobranzaHistoricaServicio::all();
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
        // Crear una cobranza historica de un servicio
        $cobranzaHist = new CobranzaHistoricaServicio;
        $cobranzaHist->tgf_disponibilidad_servicio_id = $request->tgf_disponibilidad_servicio_id;
        $cobranzaHist->tgf_cliente_id = $request->tgf_cliente_id;
        $cobranzaHist->chs_monto = $request->chs_monto;

        $cobranzaHist->save();

        // Cachear disponibilidad de servicio
        $cobranzaHist->disponibilidad_servicio;

        // Enviar por pusher
        $this->pusher->trigger('cobranzaHistoricaServicio', 'create', $cobranzaHist);

        // Crear una cobranza de servicio
        $cobranza = new CobranzaServicio;
        $cobranza->tgf_cobranza_historica_servicio_id = $cobranzaHist->id;
        $cobranza->tgf_cliente_id = $cobranzaHist->tgf_cliente_id;

        $cobranza->save();

        // Cachear cobranza historica
        $cobranza->cobranza_historica_servicio;

        // Enviar por pusher
        $this->pusher->trigger('cobranzaServicio', 'create', $cobranza);

        return $cobranzaHist->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CobranzaHistoricaServicio::find($id);
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
        $cobranzaHist = CobranzaHistoricaServicio::find($id);
        $cobranzaHist->update($request->all());

        // Cachear disponibilidad de servicio y pago
        $cobranzaHist->disponibilidad_servicio;
        $cobranzaHist->pago_servicio;

        $this->pusher->trigger('cobranzaHistoricaServicio', 'update', $cobranzaHist);

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
        // No se deben eliminar cobranzas historicas
    }
}
