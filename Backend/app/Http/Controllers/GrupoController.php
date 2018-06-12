<?php

namespace App\Http\Controllers;

use App\Grupo;
use App\SolicitudGrupo;
use Illuminate\Http\Request;
use Pusher\Laravel\PusherManager;
use JWTAuth;

class GrupoController extends Controller
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
    public function index(AuthenticateController $auth)
    {
        $usuario = $auth->getAuthenticatedUser();
        
        switch ($usuario->rol->rol_nombre) {
            case 'Administrador':
                return Grupo::with(['horarios','contratos','sede'])->get();
            case 'Profesor':
                return Grupo::with(['horarios','sede'])->get();
            case 'Cliente':
                $contratos = $usuario->cliente->contratos;
                $grupos = $contratos->pluck('grupo');

                // Indicar que el grupo fue contratado
                foreach ($grupos as $grupo) {
                    $grupo->contratado = true;
                }

                $grupos = $grupos->merge( Grupo::all() );
                $grupos->pluck('horarios');
                $grupos->pluck('sede');

                return $grupos->unique('id');
        }

        return null;
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
        $grupo = new Grupo;
        $grupo->tgf_sede_id = $request->tgf_sede_id;
        $grupo->tgf_tipo_grupo_id = $request->tgf_tipo_grupo_id;
        $grupo->gru_nombre = $request->gru_nombre;
        $grupo->gru_descripcion = $request->gru_descripcion;
        $grupo->gru_costo = $request->gru_costo;
        $grupo->gru_capacidad = $request->gru_capacidad;
        $grupo->gru_solicitable = $request->gru_solicitable;

        $grupo->save();

        // Cachear variables
        $grupo->horarios;
        $grupo->contratos;
        $grupo->sede;

        $this->pusher->trigger('grupo', 'create', $grupo);

        return $grupo->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Grupo::with('horarios', 'contratos')->find($id);
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
        $grupo = Grupo::find($id);
        $grupo->update($request->all());

        // Cachear variables
        $grupo->horarios;
        $grupo->contratos;
        $grupo->sede;

        $this->pusher->trigger('grupo', 'update', $grupo);

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
        Grupo::destroy($id);

        $this->pusher->trigger('grupo', 'delete', $id);

        return ['deleted' => true];
    }

    /**
     * Obtener los contratos de un grupo
     * 
     * @param  int  $id
     * @return \App\Contrato
     */
    public function contratos($id) {
        return Grupo::find($id)->contratos;
    }

    /**
     * Obtener los contratos historicos de un grupo
     * 
     * @param  int  $id
     * @return \App\ContratoHistorico
     */
    public function contratosHistoricos($id) {
        return Grupo::find($id)->contratos_historicos;
    }

    /**
     * Obtener los contratos de un grupo con sus cobranzas
     * 
     * @param  int  $id
     * @return \App\Contrato
     */
    public function contratosCobranzas($id) {
        return Grupo::find($id)->contratos()->with('cobranzas.cobranza_historica.contrato_historico')->get();
    }

    /**
     * Obtener los contratos historicos de un grupo con sus cobranzas historicas
     * 
     * @param  int  $id
     * @return \App\ContratoHistorico
     */
    public function contratosCobranzasHistoricas($id) {
        return Grupo::find($id)->contratos_historicos()->with('cobranzas_historicas')->get();
    }

    /**
     * Obtener los profesores de un grupo
     * 
     * @param  int  $id
     * @return \App\Profesor
     */
    public function profesores($id) {
        return Grupo::find($id)->profesores;
    }

    /**
     * Obtener los horarios de un grupo
     * 
     * @param  int  $id
     * @return \App\Horario
     */
    public function horarios($id) {
        return Grupo::find($id)->horarios;
    }

    /**
     * Obtener todos los clientes de un grupo
     * 
     * @param  int  $id
     * @return \App\Cliente
     */
    public function clientes($id) {

        $clientes = Grupo::find($id)->clientes;
        $clientes->pluck('usuario');

        return $clientes;
    }

    /**
     * Obtener las solicitudes de un grupo
     * 
     * @param  int  $id
     * @return \App\SolicitudGrupo
     */
    public function solicitudes($id) {
        return Grupo::find($id)->solicitudesGrupo()->with('cliente.usuario', 'grupo')->get();
    }
    
}
