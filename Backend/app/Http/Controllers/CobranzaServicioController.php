<?php

namespace App\Http\Controllers;

use App\CobranzaServicio;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class CobranzaServicioController extends Controller
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
        return CobranzaServicio::all();
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
        // Para crear una cobranza de servicio, hacerlo por medio de CobranzaHistoricaServicioController
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CobranzaServicio::find($id);
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
        $cobranza = CobranzaServicio::find($id);
        $cobranza->update($request->all());

        // Cachear cobranza historica
        $cobranza->cobranza_historica_servicio;

        // Enviar por pusher
        $this->pusher->trigger('cobranzaServicio', 'update', $cobranza);

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
        CobranzaServicio::destroy($id);

        $this->pusher->trigger('cobranzaServicio', 'delete', $id);

        return ['deleted' => true];
    }
}
