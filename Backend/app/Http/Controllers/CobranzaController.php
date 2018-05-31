<?php

namespace App\Http\Controllers;

use App\Cobranza;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class CobranzaController extends Controller
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
        return Cobranza::with(['contrato.cliente', 'contrato.plan'])->get();
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
        $cobranza = new Cobranza;
        $cobranza->tgf_contrato_id = $request->tgf_contrato_id;
        $cobranza->cob_monto = $request->cob_monto;

        $cobranza->save();
        $cobranza->contrato->cliente;
        $cobranza->contrato->plan;

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
        return Cobranza::find($id);
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
        $cobranza = Cobranza::find($id);
        $cobranza->update($request->all());

        // Cachear variables
        $cobranza->contrato->cliente;
        $cobranza->contrato->plan;
        $cobranza->pago;

        $this->pusher->trigger('cobranza', 'update', $cobranza);

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
        Cobranza::destroy($id);

        $this->pusher->trigger('cobranza', 'delete', $id);

        return ['deleted' => true];
    }
    
}
