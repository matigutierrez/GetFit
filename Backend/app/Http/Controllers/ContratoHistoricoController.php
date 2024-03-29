<?php

namespace App\Http\Controllers;

use App\Contrato;
use App\ContratoHistorico;
use App\SolicitudGrupo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
        
        $solicitud = SolicitudGrupo::where([
            'tgf_cliente_id' => $requestContrato->tgf_cliente_id,
            'tgf_plan_id' => $requestContrato->tgf_plan_id
        ])->get()->first();

        if ( isset($solicitud) ) {

            SolicitudGrupo::destroy($solicitud->id);

            $this->pusher->trigger('solicitudGrupo', 'delete', $solicitud->id);

        }

        $contratoHist = new ContratoHistorico;
        $contratoHist->tgf_cliente_id = $requestContrato->tgf_cliente_id;
        $contratoHist->tgf_grupo_id = $requestContrato->tgf_grupo_id;

        if ( $request->hasFile('acta') ) {

            $file = $request->file('acta');

            // El archivo se guarda en /storage/app/actas
            $contratoHist->con_acta = Storage::put('actas', $file);

        }

        // Guardar contrato historico
        $contratoHist->save();

        // Agregar 'cliente' y 'grupo' a cache
        $contratoHist->cliente->usuario;
        $contratoHist->grupo;

        $this->pusher->trigger('contrato_historico', 'create', $contratoHist);

        // Crear contrato normal
        $contrato = new Contrato;
        $contrato->tgf_contrato_historico_id = $contratoHist->id;
        $contrato->tgf_grupo_id = $contratoHist->tgf_grupo_id;

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
