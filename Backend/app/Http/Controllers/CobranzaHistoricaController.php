<?php

namespace App\Http\Controllers;

use App\Cobranza;
use App\CobranzaHistorica;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class CobranzaHistoricaController extends Controller
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
        return CobranzaHistorica::with('contrato_historico')->get();
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
        $cobranzaHist = new CobranzaHistorica;
        $cobranzaHist->tgf_contrato_historico_id = $request->tgf_contrato_historico_id;
        $cobranzaHist->cob_monto = $request->cob_monto;

        $cobranzaHist->save();
        $cobranzaHist->pago;
        $cobranzaHist->contrato_historico;

        $this->pusher->trigger('cobranza_historica', 'create', $cobranzaHist);

        $cobranza = new Cobranza;
        $cobranza->tgf_cobranza_historica_id = $cobranzaHist->id;
        $cobranza->tgf_contrato_id = $cobranzaHist->contrato_historico->contrato->id;

        $cobranza->save();

        // Cachear variables
        $cobranza->contrato;
        $cobranza->cobranza_historica;

        $this->pusher->trigger('cobranza', 'create', $cobranza);

        return $cobranza->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CobranzaHistorica::find($id);
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
        $cobranzaHist = CobranzaHistorica::find($id);
        $cobranzaHist->update($request->all());

        // Cachear variables
        $cobranzaHist->pago;
        $cobranzaHist->contrato_historico;

        $this->pusher->trigger('cobranza_historica', 'create', $cobranzaHist);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // No se debe eliminar una cobranza historica
    }
}
