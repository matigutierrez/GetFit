<?php

namespace App\Http\Controllers;

use App\Pago;
use App\Contrato;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class PagoController extends Controller
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
        return Pago::all();
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
        $pago = new Pago;
        $pago->tgf_cobranza_historica_id = $request->tgf_cobranza_historica_id;
        $pago->tgf_metodo_pago_id = $request->tgf_metodo_pago_id;

        // Guardar pago
        $pago->save();

        // Avisar sobre pago por pusher
        $this->pusher->trigger('pago', 'create', $pago);

        // Al registrar un pago, la cobranza debería desaparecer, pero mantenerse historica
        $cobranza = $pago->cobranza_historica->cobranza;

        if ( isset($cobranza) ) {
            // Eliminar cobranza
            Cobranza::destroy($cobranza->id);

            // Avisar por pusher
            $this->pusher->trigger('cobranza', 'delete', $cobranza->id);
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
        return Pago::find($id);
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
        $pago = Pago::find($id);
        $pago->update($request->all());

        $this->pusher->trigger('pago', 'update', $pago);

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
        Pago::destroy($id);

        $this->pusher->trigger('pago', 'delete', $id);

        return ['deleted' => true];
    }
}
