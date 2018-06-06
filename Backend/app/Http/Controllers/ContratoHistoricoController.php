<?php

namespace App\Http\Controllers;

use App\Contrato;
use App\ContratoHistorico;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;

class ContratoHistoricoController extends Controller
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
        return ContratoHistorico::all();
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
        $requestContrato = json_decode(File::get($request->file('contrato')));
        
        $contratoHist = new ContratoHistorico;
        $contratoHist->tgf_cliente_id = $requestContrato->tgf_cliente_id;
        $contratoHist->tgf_plan_id = $requestContrato->tgf_plan_id;

        if ( $request->hasFile('acta') ) {

            $file = $request->file('acta');

            // El archivo se guarda en /storage/app/actas
            $contratoHist->con_acta = Storage::put('actas', $file);

        }

        // Guardar contrato historico
        $contratoHist->save();

        // Agregar 'cliente' y 'plan' a cache
        $contratoHist->cliente->usuario;
        $contratoHist->plan;

        $this->pusher->trigger('contrato_historico', 'create', $contratoHist);

        // Crear contrato normal
        $contrato = new Contrato;
        $contrato->tgf_contrato_historico_id = $contratoHist->id;
        $contrato->tgf_plan_id = $contratoHist->tgf_plan_id;

        // Guardar contrato
        $contrato->save();

        // Enviar por pusher
        $this->pusher->trigger('contrato', 'create', $contrato);
        
        // Retornar ID
        return $contratoHist->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ContratoHistorico::find($id);
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
        $contratoHist = ContratoHistorico::find($id);
        $contratoHist->update($request->all());

        $this->pusher->trigger('contrato_historico', 'update', $contrato);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // No se debe eliminar un contrato historico
    }
}
