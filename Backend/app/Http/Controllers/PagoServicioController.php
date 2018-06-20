<?php

namespace App\Http\Controllers;

use App\PagoServicio;
use App\CobranzaServicio;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class PagoServicioController extends Controller
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
        return PagoServicio::all();
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
        $pago = new PagoServicio;
        $pago->tgf_cobranza_historica_servicio_id = $request->tgf_cobranza_historica_servicio_id;
        $pago->tgf_metodo_pago_id = $request->tgf_metodo_pago_id;

        $pago->save();

        // Cachear metodo de pago
        $pago->metodo_pago;

        // Enviar pago por pusher
        $this->pusher->trigger('pagoServicio', 'create', $pago);

        // Al registrar pago, eliminar cobranza (no cobranza historica)
        $cobranza = $pago->cobranza_historica_servicio->cobranza_servicio;

        if ( isset($cobranza) ) {
            // Eliminar cobranza
            CobranzaServicio::destroy($cobranza->id);

            $this->pusher->trigger('cobranzaServicio', 'delete', $cobranza->id);
        }

        return $pago->id;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PagoServicio::find($id);
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
        $pago = PagoServicio::find($id);
        $pago->update($request->all());

        // Cachear metodo de pago
        $pago->metodo_pago;

        // Enviar por pusher
        $this->pusher->trigger('pagoServicio', 'update', $pago);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        PagoServicio::destroy($id);

        // Cachear metodo de pago
        $pago->metodo_pago;

        // Enviar por pusher
        $this->pusher->trigger('pagoServicio', 'delete', $pago);
    }
}
