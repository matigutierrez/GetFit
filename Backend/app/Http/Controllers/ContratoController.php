<?php

namespace App\Http\Controllers;

use App\Contrato;
use App\ContratoHistorico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Pusher\Laravel\PusherManager;

class ContratoController extends Controller
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
        return Contrato::all();
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
        // LOS CONTRATOS SE CREAN A TRAVES DE ContratoHistoricoController
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Contrato::with('plan')->find($id);
    }

    /**
     * Buscar un contrato por el ID del cliente y el ID del plan
     * 
     * @param  int  $cliente_id ID del plan
     * @param  int  $plan_id ID del plan
     */
    public function find($cliente_id, $plan_id) {
        return ContratoHistorico::where([
            'tgf_cliente_id' => $cliente_id,
            'tgf_plan_id' => $plan_id
        ])->get()->first()->contrato;
    }

    /**
     * Buscar un contrato por el token del cliente y el ID del plan
     * 
     * @param  int  $cliente_id ID del plan
     * @param  int  $plan_id ID del plan
     */
    public function findToken(AuthenticateController $auth, $plan_id) {
        return ContratoHistorico::where([
            'tgf_cliente_id' => $auth->getAuthenticatedUser()->cliente->id,
            'tgf_plan_id' => $plan_id
        ])->get()->first()->contrato;
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
        // Buscar un contrato
        $contrato = Contrato::find($id);
        $contrato->update( $request->all() );

        $this->pusher->trigger('contrato', 'update', $contrato);

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
        Contrato::destroy($id);

        $this->pusher->trigger('contrato', 'delete', $id);

        return ['deleted' => true];
    }

    public function acta($id) {
        // Buscar contrato
        $contrato = Contrato::find($id);
        
        // Si hay contrato
        if ( isset($contrato) ) {
            // Obtener contrato historico
            $contratoHist = $contrato->contrato_historico;

            return response()->file(storage_path("app/" . $contratoHist->con_acta));
        }

        return null;
    }
    
}
