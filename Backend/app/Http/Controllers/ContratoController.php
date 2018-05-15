<?php

namespace App\Http\Controllers;

use App\Contrato;
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
        $requestContrato = json_decode(File::get($request->file('contrato')));
        
        $contrato = new Contrato;
        $contrato->tgf_cliente_id = $requestContrato->tgf_cliente_id;
        $contrato->tgf_plan_id = $requestContrato->tgf_plan_id;

        if ( $request->hasFile('acta') ) {

            $file = $request->file('acta');

            // El archivo se guarda en /storage/app/actas
            $contrato->con_acta = Storage::put('actas', $file);

        }

        // Guardar contrato
        $contrato->save();

        // Agregar cliente a cache
        $contrato->cliente;

        $this->pusher->trigger('contrato', 'create', $contrato);
        
        return $contrato->id;
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
        $contrato = Contrato::find($id);
        $contrato->update( $request->all() );

        // Agregar 'cliente' a cache
        $contrato->cliente;

        $this->pusher->trigger('contrato', 'create', $contrato);

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
        $contrato = Contrato::find($id);
        if ( isset($contrato) ) {
            return response()->file(storage_path("app/" . $contrato->con_acta));
        }
        return null;
    }
}
